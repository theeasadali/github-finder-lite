export async function fetchUser(username) {
  const res = await fetch(
    `https://api.github.com/users/${encodeURIComponent(username)}`
  );
  if (res.status === 404) throw new Error("User not found");
  if (res.status === 403)
    throw new Error("Rate limit exceeded. Try again in a minute.");
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  const j = await res.json();
  return {
    avatar_url: j.avatar_url,
    login: j.login,
    name: j.name,
    bio: j.bio,
    followers: j.followers,
    following: j.following,
    public_repos: j.public_repos,
    html_url: j.html_url,
    company: j.company,
    location: j.location,
    blog: j.blog,
  };
}
