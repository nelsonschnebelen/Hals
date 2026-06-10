#!/usr/bin/env python3
"""Generate local placeholder images for every IMG slot in src/lib/content.ts.

Each placeholder is an on-brand frame — ink gradient, warm glow, film grain,
hairline gold border — labeled with the real photograph that should replace
it. Output: public/placeholders/<key>.jpg
"""

import math
import os
import random
from PIL import Image, ImageDraw, ImageFont, ImageFilter

OUT = os.path.join(os.path.dirname(__file__), "..", "public", "placeholders")

INK = (10, 8, 7)
GOLD = (197, 165, 114)
CREAM = (245, 241, 234)

SERIF_IT = "/usr/share/fonts/truetype/liberation/LiberationSerif-Italic.ttf"
SANS = "/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf"

# key -> (label, (w, h), warm tint of the glow)
IMAGES = {
    "ribeye": ("Bone-In Ribeye", (1600, 2000), (120, 60, 40)),
    "auPoivre": ("Steak au Poivre", (1600, 2000), (110, 70, 45)),
    "lobsterMac": ("Lobster Mac & Cheese", (1600, 2000), (130, 85, 40)),
    "redfish": ("Blackened Redfish", (1600, 2000), (90, 75, 50)),
    "bananasFoster": ("Bananas Foster", (1600, 2000), (140, 90, 45)),
    "openFlame": ("The Open Flame", (1600, 2000), (150, 70, 30)),
    "diningRoom": ("The Dining Room", (1600, 2000), (100, 70, 45)),
    "liveMusic": ("Live Music, Nightly", (1600, 2000), (80, 60, 55)),
    "barCocktails": ("At the Bar", (1600, 2000), (110, 75, 50)),
    "openKitchen": ("The Open Kitchen", (1600, 2000), (125, 75, 40)),
    "privateTable": ("Private Dining", (1600, 2000), (105, 80, 50)),
    "wine": ("Poured Tableside", (1600, 2000), (110, 50, 45)),
    "atlantaRoom": ("Buckhead, Atlanta", (1600, 1000), (105, 72, 45)),
    "nashvilleRoom": ("Downtown Nashville", (1600, 1000), (95, 70, 52)),
}


def tracked(draw, xy, text, font, fill, tracking, anchor_center_x=None):
    """Draw text with letterspacing; optionally centered on anchor_center_x."""
    widths = [draw.textlength(c, font=font) for c in text]
    total = sum(widths) + tracking * (len(text) - 1)
    x = (anchor_center_x - total / 2) if anchor_center_x is not None else xy[0]
    y = xy[1]
    for c, w in zip(text, widths):
        draw.text((x, y), c, font=font, fill=fill)
        x += w + tracking
    return total


def build(key, label, size, tint, seed):
    w, h = size
    rng = random.Random(seed)

    # Vertical ink gradient, slightly varied per image.
    top = tuple(max(0, c + rng.randint(-2, 3)) for c in INK)
    bottom = tuple(min(255, int(c * 2.4) + rng.randint(0, 6)) for c in INK)
    img = Image.new("RGB", (w, h))
    px = img.load()
    for y in range(h):
        t = y / (h - 1)
        row = tuple(int(top[i] + (bottom[i] - top[i]) * t) for i in range(3))
        for x in range(w):
            px[x, y] = row

    # Soft warm glow, offset like a low lamp.
    glow = Image.radial_gradient("L").resize((w, w))
    glow = glow.point(lambda v: max(0, 255 - v) // 3)
    layer = Image.new("RGB", (w, h), tint)
    mask = Image.new("L", (w, h), 0)
    gx, gy = int(w * rng.uniform(0.2, 0.8) - w / 2), int(h * rng.uniform(0.25, 0.7) - w / 2)
    mask.paste(glow, (gx, gy))
    mask = mask.filter(ImageFilter.GaussianBlur(60))
    img = Image.composite(layer, img, mask)

    # Film grain.
    noise = Image.frombytes("L", (w, h), os.urandom(w * h))
    img = Image.composite(
        Image.new("RGB", (w, h), (128, 128, 128)), img, noise.point(lambda v: v // 18)
    )

    draw = ImageDraw.Draw(img)

    # Hairline gold frame.
    inset = int(min(w, h) * 0.035)
    draw.rectangle(
        [inset, inset, w - inset, h - inset],
        outline=tuple(int(c * 0.55) for c in GOLD),
        width=2,
    )

    scale = min(w, h) / 1600
    eyebrow_f = ImageFont.truetype(SANS, int(34 * scale))
    label_f = ImageFont.truetype(SERIF_IT, int(150 * scale))
    foot_f = ImageFont.truetype(SANS, int(30 * scale))

    cy = h / 2

    tracked(
        draw,
        (0, cy - int(190 * scale)),
        "PHOTOGRAPH TO COME",
        eyebrow_f,
        tuple(int(c * 0.45) for c in CREAM),
        int(14 * scale),
        anchor_center_x=w / 2,
    )

    bbox = draw.textbbox((0, 0), label, font=label_f)
    draw.text(
        ((w - (bbox[2] - bbox[0])) / 2 - bbox[0], cy - (bbox[3] - bbox[1]) / 2 - bbox[1]),
        label,
        font=label_f,
        fill=GOLD,
    )

    line_y = cy + int(150 * scale)
    draw.rectangle(
        [w / 2 - int(40 * scale), line_y, w / 2 + int(40 * scale), line_y + 2],
        fill=tuple(int(c * 0.7) for c in GOLD),
    )

    tracked(
        draw,
        (0, h - inset - int(90 * scale)),
        "HAL'S THE STEAKHOUSE",
        foot_f,
        tuple(int(c * 0.35) for c in CREAM),
        int(12 * scale),
        anchor_center_x=w / 2,
    )

    img.save(os.path.join(OUT, f"{key}.jpg"), quality=88)
    print(f"  {key}.jpg  {w}x{h}  '{label}'")


os.makedirs(OUT, exist_ok=True)
for i, (key, (label, size, tint)) in enumerate(IMAGES.items()):
    build(key, label, size, tint, seed=i * 71 + 9)
print(f"\n{len(IMAGES)} placeholders -> {os.path.relpath(OUT)}")
