// Stylized vector paratrooper — deliberately iconic/silhouette rather than
// photoreal, so it reads clearly at small sizes and stays on-brand.
export default function Parachutist({ className }) {
  return (
    <svg
      viewBox="0 0 220 300"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="canopyStripes" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#f02a18" />
          <stop offset="16%" stopColor="#f02a18" />
          <stop offset="16%" stopColor="#f5efe9" />
          <stop offset="33%" stopColor="#f5efe9" />
          <stop offset="33%" stopColor="#549217" />
          <stop offset="50%" stopColor="#549217" />
          <stop offset="50%" stopColor="#e7cc3c" />
          <stop offset="66%" stopColor="#e7cc3c" />
          <stop offset="66%" stopColor="#f02a18" />
          <stop offset="83%" stopColor="#f02a18" />
          <stop offset="83%" stopColor="#f5efe9" />
          <stop offset="100%" stopColor="#f5efe9" />
        </linearGradient>
      </defs>

      {/* suspension lines */}
      <g stroke="rgba(245,239,233,0.55)" strokeWidth="1.2">
        <line x1="18" y1="93" x2="108" y2="176" />
        <line x1="58" y1="100" x2="108" y2="176" />
        <line x1="202" y1="93" x2="122" y2="176" />
        <line x1="162" y1="100" x2="122" y2="176" />
      </g>

      {/* canopy */}
      <path
        d="M10 95 C 10 25, 60 5, 110 5 C 160 5, 210 25, 210 95 C 170 78, 150 90, 110 90 C 70 90, 50 78, 10 95 Z"
        fill="url(#canopyStripes)"
        stroke="#2b1821"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />

      {/* canopy ribs */}
      <g stroke="#2b1821" strokeOpacity="0.28" strokeWidth="1.5" fill="none">
        <path d="M40 18 C 35 44, 35 70, 45 90" />
        <path d="M80 7 C 78 40, 78 68, 82 90" />
        <path d="M140 7 C 142 40, 142 68, 138 90" />
        <path d="M180 18 C 185 44, 185 70, 175 90" />
      </g>

      {/* harness convergence point */}
      <circle cx="110" cy="177" r="3" fill="#f5efe9" />

      {/* reserve rig on back */}
      <rect x="97" y="180" width="26" height="32" rx="7" fill="#3a2029" />

      {/* torso / jumpsuit */}
      <path
        d="M91 186 C 91 178, 129 178, 129 186 L 133 226 C 133 238, 87 238, 87 226 Z"
        fill="#f5efe9"
      />
      {/* accent stripe */}
      <path d="M95 197 L125 197 L123 212 L97 212 Z" fill="#7ec53e" />

      {/* head + helmet visor */}
      <circle cx="110" cy="173" r="11.5" fill="#e7cc3c" />
      <path d="M100.5 173 a9.5 9.5 0 0 1 19 0 Z" fill="#2b1821" />

      {/* arms gripping risers */}
      <path
        d="M91 189 C 77 179, 64 150, 59 103"
        stroke="#f5efe9"
        strokeWidth="7.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M129 189 C 143 179, 156 150, 161 103"
        stroke="#f5efe9"
        strokeWidth="7.5"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="59" cy="102" r="5.5" fill="#f35446" />
      <circle cx="161" cy="102" r="5.5" fill="#f35446" />

      {/* tucked flying legs */}
      <path
        d="M96 230 C 89 248, 76 259, 63 262"
        stroke="#3a2029"
        strokeWidth="9.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M124 230 C 131 248, 144 259, 157 262"
        stroke="#3a2029"
        strokeWidth="9.5"
        strokeLinecap="round"
        fill="none"
      />
      <ellipse cx="60" cy="264" rx="9.5" ry="5.5" fill="#2b1821" />
      <ellipse cx="160" cy="264" rx="9.5" ry="5.5" fill="#2b1821" />
    </svg>
  );
}
