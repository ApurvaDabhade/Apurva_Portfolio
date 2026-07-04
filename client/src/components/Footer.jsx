export default function Footer({ profile }) {
  return (
    <footer>
      <div className="ft">© 2026 {profile.name} — B.Tech {profile.branch}, VIIT Pune — Graduating {profile.graduationYear}</div>
      <div className="fl">
        <a href={`mailto:${profile.email}`}>email</a>
        <a href={profile.linkedin} target="_blank" rel="noreferrer">linkedin</a>
        <a href={profile.github} target="_blank" rel="noreferrer">github</a>
        <a href={profile.leetcode} target="_blank" rel="noreferrer">leetcode</a>
      </div>
    </footer>
  );
}
