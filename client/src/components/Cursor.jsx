export default function Cursor() {
  return (
    <>
      <div id="cur-dot">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <circle cx="6" cy="6" r="2.5" fill="#4F8EF7" />
          <circle cx="6" cy="6" r="5" stroke="#4F8EF7" strokeWidth=".8" fill="none" opacity=".4" />
        </svg>
      </div>
      <div id="cur-ring">
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none" opacity=".35">
          <circle cx="18" cy="18" r="16" stroke="white" strokeWidth=".8" strokeDasharray="3 4" />
        </svg>
      </div>
    </>
  );
}
