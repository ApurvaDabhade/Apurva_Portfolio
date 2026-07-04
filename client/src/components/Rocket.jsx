export default function Rocket() {
  return (
    <div id="rw">
      <svg className="rsv" viewBox="0 0 48 100" fill="none">
        <defs>
          <linearGradient id="rg" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#60A5FA" />
            <stop offset="1" stopColor="#4F8EF7" />
          </linearGradient>
        </defs>
        <path d="M24 4C14 4 8 22 8 42L40 42C40 22 34 4 24 4Z" fill="url(#rg)" stroke="rgba(79,142,247,.4)" strokeWidth=".8" />
        <path d="M24 2C20 2 13 10 11 18L37 18C35 10 28 2 24 2Z" fill="#4F8EF7" />
        <circle cx="24" cy="27" r="5.5" fill="#0B0B0B" stroke="rgba(79,142,247,.5)" strokeWidth=".8" />
        <circle cx="24" cy="27" r="2.5" fill="#4F8EF7" opacity=".4" />
        <path d="M8 42L2 56L12 51Z" fill="#B49BFF" opacity=".65" />
        <path d="M40 42L46 56L36 51Z" fill="#B49BFF" opacity=".65" />
        <rect x="19" y="42" width="10" height="6" rx="2" fill="#60A5FA" opacity=".5" />
        <g className="rf">
          <ellipse cx="24" cy="53" rx="4.5" ry="9" fill="#FBBF24" opacity=".9" />
          <ellipse cx="24" cy="51.5" rx="3" ry="6" fill="#FDE68A" opacity=".8" />
          <ellipse cx="24" cy="50" rx="1.7" ry="3.5" fill="#fff" opacity=".6" />
        </g>
      </svg>
    </div>
  );
}
