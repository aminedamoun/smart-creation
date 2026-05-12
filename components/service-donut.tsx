import Image from "next/image";

/**
 * Rotating services donut with the SC cube at its center.
 * Two text rings spin in opposite directions; the cube floats and pulses
 * with a halo + light-sweep sheen for a subtle hero accent.
 */
export function ServiceDonut({ className }: { className?: string }) {
  const ringLabel =
    " · COMPANY FORMATION · FREE ZONE · OFFSHORE · VISAS · CORPORATE BANKING · ACCOUNTING · CORPORATE TAX · BUSINESS CENTERS · COMPLIANCE";
  const jurisdictions =
    " · DUBAI · ABU DHABI · SHARJAH · RAS AL KHAIMAH · AJMAN · UMM AL QUWAIN · FUJAIRAH";

  return (
    <div className={`relative ${className ?? ""}`}>
      <svg
        viewBox="0 0 500 500"
        className="absolute inset-0 h-full w-full"
        role="img"
        aria-label="Services offered by Smart Creation Group"
      >
        <defs>
          <path
            id="donut-outer-path"
            d="M 250,40 A 210,210 0 1,1 249.999,40"
            fill="none"
          />
          <path
            id="donut-inner-path"
            d="M 250,90 A 160,160 0 1,1 249.999,90"
            fill="none"
          />
          <radialGradient id="donut-glow" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="#48a8db" stopOpacity="0.32" />
            <stop offset="100%" stopColor="#48a8db" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ambient glow */}
        <circle cx="250" cy="250" r="240" fill="url(#donut-glow)" />

        {/* Outer decorative tick ring */}
        <g>
          {Array.from({ length: 72 }).map((_, i) => {
            const angle = (i * 360) / 72;
            const isMajor = i % 9 === 0;
            const r1 = 238;
            const r2 = isMajor ? 228 : 233;
            const rad = (angle - 90) * (Math.PI / 180);
            const round = (n: number) => Number(n.toFixed(3));
            const x1 = round(250 + r1 * Math.cos(rad));
            const y1 = round(250 + r1 * Math.sin(rad));
            const x2 = round(250 + r2 * Math.cos(rad));
            const y2 = round(250 + r2 * Math.sin(rad));
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#f6f3ec"
                strokeOpacity={isMajor ? 0.25 : 0.1}
                strokeWidth={isMajor ? 1 : 0.6}
              />
            );
          })}
        </g>

        {/* Outer rotating ring — services */}
        <g className="ring-spin-cw">
          <circle
            cx="250"
            cy="250"
            r="210"
            fill="none"
            stroke="#f6f3ec"
            strokeOpacity="0.12"
            strokeWidth="1"
          />
          <text
            fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
            fontSize="11"
            letterSpacing="3"
            fill="#f6f3ec"
            fillOpacity="0.82"
          >
            <textPath href="#donut-outer-path" startOffset="0">
              {(ringLabel + ringLabel).toUpperCase()}
            </textPath>
          </text>
        </g>

        {/* Inner counter-rotating ring — jurisdictions */}
        <g className="ring-spin-ccw">
          <circle
            cx="250"
            cy="250"
            r="160"
            fill="none"
            stroke="#8dc2dd"
            strokeOpacity="0.28"
            strokeWidth="0.6"
            strokeDasharray="3 7"
          />
          <text
            fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
            fontSize="9"
            letterSpacing="3.5"
            fill="#8dc2dd"
            fillOpacity="0.75"
          >
            <textPath href="#donut-inner-path" startOffset="0">
              {(jurisdictions + jurisdictions).toUpperCase()}
            </textPath>
          </text>
        </g>

        {/* Faint inner guide ring */}
        <circle
          cx="250"
          cy="250"
          r="112"
          fill="none"
          stroke="#f6f3ec"
          strokeOpacity="0.08"
          strokeWidth="1"
        />
      </svg>

      {/* Center: SC cube with halo + light sweep */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        {/* Soft pulsing halo behind the cube */}
        <span className="absolute h-[58%] w-[58%] rounded-full halo-pulse"
          style={{
            background:
              "radial-gradient(closest-side, rgba(72,168,219,0.55), rgba(72,168,219,0) 70%)",
          }}
        />
        {/* Floating cube */}
        <span className="relative inline-block h-[42%] w-[42%] cube-float">
          <Image
            src="/sc-cube.png"
            alt="Smart Creation"
            fill
            sizes="(min-width: 1024px) 220px, 180px"
            className="object-contain drop-shadow-[0_18px_30px_rgba(72,168,219,0.35)]"
            priority
          />
          {/* Light sweep sheen — masked to the cube silhouette */}
          <span className="absolute inset-0 cube-sheen" />
        </span>
      </div>
    </div>
  );
}
