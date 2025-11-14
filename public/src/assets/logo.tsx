
export function BHPLogo({ className = "h-8 w-auto" }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 200 60" 
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="yellowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style={{ stopColor: '#ffd000', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#ffed4e', stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      
      {/* Shield background */}
      <path 
        d="M 30 10 L 50 10 L 55 15 L 55 40 L 40 50 L 25 40 L 25 15 Z" 
        fill="url(#yellowGradient)"
      />
      
      {/* BHP text inside shield */}
      <text 
        x="40" 
        y="35" 
        fontFamily="Inter, sans-serif" 
        fontSize="16" 
        fontWeight="800" 
        fill="#0b0b0b"
        textAnchor="middle"
      >
        BHP
      </text>
      
      {/* PERFECT text */}
      <text 
        x="110" 
        y="38" 
        fontFamily="Inter, sans-serif" 
        fontSize="28" 
        fontWeight="800" 
        fill="#ffd000"
      >
        PERFECT
      </text>
    </svg>
  );
}
