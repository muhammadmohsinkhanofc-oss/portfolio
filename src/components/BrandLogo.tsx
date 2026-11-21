interface BrandLogoProps {
  variant?: 'monogram' | 'wordmark';
  tone?: 'light' | 'dark';
  className?: string;
}

export function BrandLogo({
  variant = 'monogram',
  tone = 'light',
  className = 'h-10 w-auto',
}: BrandLogoProps) {
  const primary = tone === 'light' ? '#F4F4F1' : '#080808';
  const secondary = tone === 'light' ? '#BFC1C5' : '#555555';
  const cut = tone === 'light' ? '#080808' : '#F4F4F1';

  if (variant === 'monogram') {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 120 80"
        fill="none"
        className={className}
        role="img"
        aria-label="MAD DESIGNS Monogram"
      >
        <path d="M8 68V12H20L34 38L48 12H60V68H49V31L34 57L19 31V68H8Z" fill={primary} />
        <path d="M56 68L72 12H82L66 68H56Z" fill={secondary} />
        <path
          d="M84 12H96C108.15 12 114 20.5 114 40C114 59.5 108.15 68 96 68H84V12ZM95 22V58H96.5C102.2 58 104 52.5 104 40C104 27.5 102.2 22 96.5 22H95Z"
          fill={primary}
        />
        <rect x="65" y="45" width="16" height="4" fill={cut} />
      </svg>
    );
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 420 80"
      fill="none"
      className={className}
      role="img"
      aria-label="MAD DESIGNS Wordmark"
    >
      <path d="M8 64V16H19L32 39L45 16H56V64H46V32L32 55L18 32V64H8Z" fill={primary} />
      <path d="M53 64L67 16H76L62 64H53Z" fill={secondary} />
      <path
        d="M78 16H89C100.2 16 105 23.5 105 40C105 56.5 100.2 64 89 64H78V16ZM88 25V55H89.5C94.2 55 96 50.2 96 40C96 29.8 94.2 25 89.5 25H88Z"
        fill={primary}
      />
      <rect x="122" y="18" width="1" height="44" fill={secondary} opacity="0.35" />
      <text
        x="140"
        y="39"
        fill={primary}
        fontFamily="'Plus Jakarta Sans', sans-serif"
        fontSize="22"
        fontWeight="600"
        letterSpacing="0.22em"
      >
        MAD DESIGNS™
      </text>
      <text
        x="141"
        y="57"
        fill="#777777"
        fontFamily="'Plus Jakarta Sans', sans-serif"
        fontSize="10"
        fontWeight="500"
        letterSpacing="0.32em"
      >
        CREATIVE STUDIO · KARACHI
      </text>
    </svg>
  );
}
