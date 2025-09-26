export default function SearchBar({
  value,
  onChange,
  onSubmit,
  canSearch,
  loading,
}) {
  return (
    <form onSubmit={onSubmit} className="row">
      <input
        className="input"
        placeholder="Search GitHub username…"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoFocus
      />
      <button className="btn" disabled={!canSearch || loading} type="submit">
        {loading ? "Searching…" : "Search"}
      </button>
    </form>
  );
}
