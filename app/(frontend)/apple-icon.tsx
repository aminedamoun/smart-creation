import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0d1013",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 40,
        }}
      >
        <svg
          viewBox="0 0 120 130"
          width={140}
          height={152}
          xmlns="http://www.w3.org/2000/svg"
        >
          <polygon
            points="60,8 108,35 60,62 12,35"
            fill="#f6f3ec"
            stroke="#0d1013"
            strokeWidth="1.4"
          />
          <polygon
            points="12,35 60,62 60,118 12,91"
            fill="#48a8db"
            stroke="#0d1013"
            strokeWidth="1.4"
          />
          <polygon
            points="60,62 108,35 108,91 60,118"
            fill="#737574"
            stroke="#0d1013"
            strokeWidth="1.4"
          />
        </svg>
      </div>
    ),
    { ...size }
  );
}
