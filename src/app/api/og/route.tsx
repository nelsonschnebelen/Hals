import { ImageResponse } from "next/og";

export const runtime = "edge";

const GOLD = "#c5a572";
const BLACK = "#0a0807";

/** Dynamic, branded social-share image. /api/og?title=...&subtitle=... */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title") ?? "Hal's The Steakhouse";
  const subtitle =
    searchParams.get("subtitle") ?? "A Buckhead institution since 1989";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: `radial-gradient(circle at 50% 30%, #15110d 0%, ${BLACK} 70%)`,
          color: "#f5f1ea",
          fontFamily: "serif",
          padding: "80px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            color: GOLD,
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            fontSize: 24,
            fontFamily: "sans-serif",
            marginBottom: 32,
          }}
        >
          Buckhead · Nashville
        </div>
        <div style={{ fontSize: 78, lineHeight: 1.05, maxWidth: 900 }}>{title}</div>
        <div
          style={{
            marginTop: 28,
            fontSize: 30,
            color: "#cbbfa8",
            fontFamily: "sans-serif",
          }}
        >
          {subtitle}
        </div>
        <div
          style={{
            marginTop: 56,
            width: 120,
            height: 2,
            background: GOLD,
          }}
        />
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
