import { ImageResponse } from "next/og";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title =
    searchParams.get("title") || "SleepFix Lab";
  const eyebrow =
    searchParams.get("eyebrow") || "Sleep & snoring editorial";

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          background:
            "linear-gradient(135deg, #f5efe8 0%, #f8f5f0 42%, #dfeaec 100%)",
          color: "#1b2230",
          padding: "64px",
          fontFamily: "Georgia, serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: "28px",
            borderRadius: "40px",
            border: "1px solid rgba(27,34,48,0.14)",
            background: "rgba(255,251,245,0.78)",
          }}
        />
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "18px",
              fontFamily: "Arial, sans-serif",
              letterSpacing: "0.26em",
              textTransform: "uppercase",
              fontSize: 24,
              color: "#173940",
            }}
          >
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 999,
                border: "1px solid rgba(27,34,48,0.18)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 20,
                fontWeight: 700,
              }}
            >
              SFL
            </div>
            {eyebrow}
          </div>

          <div
            style={{
              display: "flex",
              maxWidth: 940,
              fontSize: 74,
              lineHeight: 1.04,
              letterSpacing: "-0.06em",
              fontWeight: 700,
            }}
          >
            {title}
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontFamily: "Arial, sans-serif",
              color: "#596577",
              fontSize: 28,
            }}
          >
            <span>Quiet nights, clearer mornings</span>
            <span>sleepfixlab.com</span>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
