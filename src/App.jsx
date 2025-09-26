import { useEffect, useMemo, useState } from "react";
import SearchBar from "./components/SearchBar.jsx";
import UserCard from "./components/UserCard.jsx";
import { fetchUser } from "./lib/api.js";

export default function App() {
  const [query, setQuery] = useState("");
  const [username, setUsername] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const canSearch = useMemo(() => query.trim().length > 0, [query]);

  useEffect(() => {
    if (!username) return;
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        setError("");
        setData(null);
        const user = await fetchUser(username);
        if (!cancelled) setData(user);
      } catch (e) {
        if (!cancelled) setError(e.message || "Something went wrong");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [username]);

  function onSubmit(e) {
    e.preventDefault();
    if (canSearch) setUsername(query.trim());
  }

  return (
    <div className="container">
      <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700 }}>
        GitHub Finder (Lite)
      </h1>
      <p style={{ marginTop: 6, color: "#94a3b8" }}>
        Type a GitHub username and press Enter.
      </p>

      <div className="card" style={{ marginTop: 16 }}>
        <SearchBar
          value={query}
          onChange={setQuery}
          onSubmit={onSubmit}
          canSearch={canSearch}
          loading={loading}
        />

        {loading && (
          <div className="row" style={{ marginTop: 14 }}>
            <div className="spinner" />
            <span>Loading…</span>
          </div>
        )}
        {error && (
          <div style={{ color: "#fca5a5", marginTop: 12 }}>{error}</div>
        )}
        {!loading && !error && !username && (
          <div className="empty">
            Try: <code>torvalds</code>, <code>gaearon</code>,{" "}
            <code>yyx990803</code>
          </div>
        )}
        {!loading && !error && data && (
          <div className="grid">
            <UserCard user={data} />
          </div>
        )}
      </div>
    </div>
  );
}
