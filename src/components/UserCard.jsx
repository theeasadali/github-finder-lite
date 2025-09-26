export default function UserCard({ user }) {
  const {
    avatar_url,
    login,
    name,
    bio,
    followers,
    following,
    public_repos,
    html_url,
    company,
    location,
    blog,
  } = user;
  return (
    <article className="card" style={{ display: "flex", gap: 14 }}>
      <img
        src={avatar_url}
        alt={login}
        width={88}
        height={88}
        style={{ borderRadius: 12, objectFit: "cover" }}
      />
      <div style={{ flex: 1 }}>
        <div className="row" style={{ justifyContent: "space-between" }}>
          <div>
            <a
              href={html_url}
              target="_blank"
              rel="noreferrer"
              style={{
                color: "#a5b4fc",
                textDecoration: "none",
                fontWeight: 700,
              }}
            >
              {name || login}
            </a>
            <div style={{ color: "#94a3b8", fontSize: 14 }}>@{login}</div>
          </div>
          <div className="row" style={{ gap: 8 }}>
            <span className="badge">{followers} followers</span>
            <span className="badge">{following} following</span>
            <span className="badge">{public_repos} repos</span>
          </div>
        </div>
        {bio && <p style={{ marginTop: 8, color: "#cbd5e1" }}>{bio}</p>}
        <div
          style={{
            display: "flex",
            gap: 10,
            flexWrap: "wrap",
            marginTop: 6,
            fontSize: 14,
            color: "#94a3b8",
          }}
        >
          {company && <span>🏢 {company}</span>}
          {location && <span>📍 {location}</span>}
          {blog && (
            <a
              href={/^https?:\/\//.test(blog) ? blog : `https://${blog}`}
              target="_blank"
              rel="noreferrer"
              style={{ color: "#a5b4fc" }}
            >
              🔗 {blog}
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
