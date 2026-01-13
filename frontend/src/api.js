const API_BASE = "";

async function safeJson(res) {
  const text = await res.text();
  try { return JSON.parse(text); } catch { return { raw: text }; }
}

export async function register(username, password) {
  try {
    const res = await fetch(
      `${API_BASE}/auth/register?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`,
      { method: "POST" }
    );
    return await safeJson(res);
  } catch (e) {
    return { error: "Failed to reach backend", detail: String(e) };
  }
}

export async function login(username, password) {
  try {
    const res = await fetch(
      `${API_BASE}/auth/login?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`,
      { method: "POST" }
    );
    return await safeJson(res);
  } catch (e) {
    return { error: "Failed to reach backend", detail: String(e) };
  }
}

export async function getWeather(token, lat, lon) {
  try {
    const res = await fetch(`${API_BASE}/weather/?lat=${lat}&lon=${lon}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return await safeJson(res);
  } catch (e) {
    return { error: "Failed to reach backend", detail: String(e) };
  }
}
