# Drop the real photos here

Save the originals into this folder with these exact filenames, then run
`npm run upload:photos` (Cloudinary assets are account-level — one-time).

| Filename | Dish / scene | Cloudinary id | Where it shows |
| --- | --- | --- | --- |
| `ribeye-steam.jpg` | Steaming bone-in chop, steam rising | `hals/ribeye-steam` | **Hero** background |
| `ribeye.jpg` | Grilled bone-in ribeye, red flower | `hals/ribeye` | Menu — Bone-In Ribeye |
| `filet.jpg` | Pepper-crusted filet in demi-glace | `hals/filet` | Menu — Steak au Poivre |
| `lobster-mac.jpg` | Lobster mac & cheese, closeup | `hals/lobster-mac` | Menu — Lobster Mac & Cheese |
| `lobster-mac-table.jpg` | Lobster mac on a set table | `hals/lobster-mac-table` | Gallery (future) |

Extensions `.jpg / .jpeg / .png / .webp / .heic` all work — only the name
before the extension is matched. The image binaries themselves are gitignored;
Cloudinary is the source of truth.
