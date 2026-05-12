import Image from "next/image";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  /** Mark-only (no wordmark) — falls back to the isometric cube SVG */
  markOnly?: boolean;
  /** Inverts colors for dark backgrounds */
  inverted?: boolean;
  /** Use the light-background variant of the logo (legible wordmark for paper bg) */
  onLight?: boolean;
};

/**
 * Smart Creation Group — official logo lockup.
 * Two WEBP variants live in /public: sc-group-logo.webp (dark-bg) and
 * sc-group-logo-light.webp (light-bg). Pass `onLight` to swap to the
 * light-background lockup so the wordmark stays legible.
 */
export function Logo({
  className,
  markOnly = false,
  inverted = false,
  onLight = false,
}: LogoProps) {
  if (markOnly) {
    return (
      <span className={cn("inline-flex items-center", className)}>
        <LogoMark inverted={inverted} />
      </span>
    );
  }
  const src = onLight ? "/sc-group-logo-light.webp" : "/sc-group-logo.webp";
  return (
    <span className={cn("inline-flex items-center", className)}>
      <Image
        src={src}
        alt="Smart Creation Group"
        width={551}
        height={228}
        priority
        className={cn(
          "h-12 w-auto sm:h-14 md:h-20",
          inverted && "brightness-0 invert"
        )}
      />
    </span>
  );
}

export function LogoMark({
  className,
  inverted = false,
  size = 36,
}: {
  className?: string;
  inverted?: boolean;
  size?: number;
}) {
  const ink = inverted ? "#f6f3ec" : "#0d1013";
  const paper = inverted ? "#0d1013" : "#f6f3ec";

  return (
    <svg
      viewBox="0 0 120 130"
      width={size}
      height={(size * 130) / 120}
      className={className}
      aria-hidden="true"
      role="img"
    >
      {/* Soft drop shadow */}
      <defs>
        <filter id="cube-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1.4" />
        </filter>
        <linearGradient id="blue-face" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#5ab3df" />
          <stop offset="100%" stopColor="#3a98cb" />
        </linearGradient>
        <linearGradient id="stone-face" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#7a7c7b" />
          <stop offset="100%" stopColor="#636564" />
        </linearGradient>
        <linearGradient id="top-face" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={paper} stopOpacity="0.98" />
          <stop offset="100%" stopColor={paper} stopOpacity="0.88" />
        </linearGradient>
      </defs>

      {/* Shadow ellipse under cube */}
      <ellipse cx="60" cy="124" rx="34" ry="3" fill={ink} opacity="0.12" filter="url(#cube-shadow)" />

      {/* Top face */}
      <polygon
        points="60,8 108,35 60,62 12,35"
        fill="url(#top-face)"
        stroke={ink}
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      {/* Top inner edge suggestion */}
      <polygon
        points="60,16 98,37 60,58 22,37"
        fill="none"
        stroke={ink}
        strokeOpacity="0.12"
        strokeWidth="0.8"
      />

      {/* Left face (blue) with S shape */}
      <g>
        <polygon
          points="12,35 60,62 60,118 12,91"
          fill="url(#blue-face)"
          stroke={ink}
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        {/* Parametric S bars drawn in left face local space.
            Face transform: (u,v) -> (12 + 48u, 35 + 27u + 56v). */}
        <g transform="matrix(48 27 0 56 12 35)">
          {/* Top bar */}
          <rect x="0.08" y="0.14" width="0.72" height="0.12" fill={paper} />
          {/* Middle bar */}
          <rect x="0.18" y="0.44" width="0.72" height="0.12" fill={paper} />
          {/* Bottom bar */}
          <rect x="0.08" y="0.74" width="0.72" height="0.12" fill={paper} />
          {/* Right connector top->middle */}
          <rect x="0.78" y="0.2" width="0.12" height="0.3" fill="url(#blue-face)" />
          {/* Left connector middle->bottom */}
          <rect x="0.08" y="0.5" width="0.12" height="0.3" fill="url(#blue-face)" />
        </g>
      </g>

      {/* Right face (stone) with C shape */}
      <g>
        <polygon
          points="60,62 108,35 108,91 60,118"
          fill="url(#stone-face)"
          stroke={ink}
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        {/* Face transform: (u,v) -> (60 + 48u, 62 - 27u + 56v). */}
        <g transform="matrix(48 -27 0 56 60 62)">
          {/* Top bar */}
          <rect x="0.08" y="0.14" width="0.82" height="0.12" fill={paper} />
          {/* Left vertical connector (the spine of C) */}
          <rect x="0.08" y="0.2" width="0.14" height="0.66" fill={paper} />
          {/* Bottom bar */}
          <rect x="0.08" y="0.74" width="0.82" height="0.12" fill={paper} />
        </g>
      </g>

      {/* Sharp front edge highlight */}
      <line x1="60" y1="62" x2="60" y2="118" stroke={ink} strokeOpacity="0.3" strokeWidth="0.6" />
    </svg>
  );
}

/**
 * Oversized hero cube — richer treatment with glow and depth.
 */
export function HeroCube({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 360 400"
      className={className}
      aria-hidden="true"
      role="presentation"
    >
      <defs>
        <linearGradient id="hero-blue" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#62b7e1" />
          <stop offset="100%" stopColor="#2e8ab8" />
        </linearGradient>
        <linearGradient id="hero-stone" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#8a8c8b" />
          <stop offset="100%" stopColor="#5b5d5c" />
        </linearGradient>
        <linearGradient id="hero-top" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fbf9f3" />
          <stop offset="100%" stopColor="#ede8dc" />
        </linearGradient>
        <radialGradient id="hero-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#48a8db" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#48a8db" stopOpacity="0" />
        </radialGradient>
        <filter id="hero-shadow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>

      {/* Ambient glow */}
      <circle cx="180" cy="200" r="170" fill="url(#hero-glow)" />

      {/* Shadow */}
      <ellipse cx="180" cy="378" rx="110" ry="10" fill="#0d1013" opacity="0.14" filter="url(#hero-shadow)" />

      {/* Top face */}
      <polygon
        points="180,24 324,105 180,186 36,105"
        fill="url(#hero-top)"
        stroke="#0d1013"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <polygon
        points="180,40 306,110 180,180 54,110"
        fill="none"
        stroke="#0d1013"
        strokeOpacity="0.1"
        strokeWidth="1"
      />

      {/* Left face (blue) */}
      <g>
        <polygon
          points="36,105 180,186 180,354 36,273"
          fill="url(#hero-blue)"
          stroke="#0d1013"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <g transform="matrix(144 81 0 168 36 105)">
          <rect x="0.08" y="0.14" width="0.72" height="0.1" fill="#fbf9f3" />
          <rect x="0.18" y="0.44" width="0.72" height="0.1" fill="#fbf9f3" />
          <rect x="0.08" y="0.76" width="0.72" height="0.1" fill="#fbf9f3" />
          <rect x="0.78" y="0.18" width="0.1" height="0.3" fill="url(#hero-blue)" />
          <rect x="0.1" y="0.5" width="0.1" height="0.3" fill="url(#hero-blue)" />
        </g>
      </g>

      {/* Right face (stone) */}
      <g>
        <polygon
          points="180,186 324,105 324,273 180,354"
          fill="url(#hero-stone)"
          stroke="#0d1013"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <g transform="matrix(144 -81 0 168 180 186)">
          <rect x="0.08" y="0.14" width="0.82" height="0.1" fill="#fbf9f3" />
          <rect x="0.08" y="0.2" width="0.12" height="0.66" fill="#fbf9f3" />
          <rect x="0.08" y="0.76" width="0.82" height="0.1" fill="#fbf9f3" />
        </g>
      </g>
    </svg>
  );
}
