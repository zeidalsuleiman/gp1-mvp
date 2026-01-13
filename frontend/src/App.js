import { useState } from "react";
import { register, login, getWeather } from "./api";

export default function App() {
  const [username, setUsername] = useState("zaid");
  const [password, setPassword] = useState("1234");
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  const [lat, setLat] = useState("31.95");
  const [lon, setLon] = useState("35.91");
  const [weather, setWeather] = useState(null);
  const [msg, setMsg] = useState("");

  const onRegister = async () => {
    setMsg("Registering...");
    const data = await register(username, password);
    setMsg(JSON.stringify(data));
  };

  const onLogin = async () => {
    setMsg("Logging in...");
    const data = await login(username, password);
    if (data.access_token) {
      localStorage.setItem("token", data.access_token);
      setToken(data.access_token);
      setMsg("Logged in ✅");
    } else {
      setMsg(JSON.stringify(data));
    }
  };

  const onGetWeather = async () => {
    setMsg("Fetching weather...");
    const data = await getWeather(token, lat, lon);
    setWeather(data);
    setMsg("");
  };

  return (
    <div style={{ fontFamily: "Arial", padding: 24, maxWidth: 700, margin: "0 auto" }}>
      <h2>Hasad GP1 MVP</h2>
      <p><b>FR-2:</b> Fetch real-time weather • <b>NFR-3:</b> JWT Auth</p>

      <div style={{ border: "1px solid #ddd", padding: 16, borderRadius: 8, marginBottom: 16 }}>
        <h3>1) Auth</h3>
        <input placeholder="username" value={username} onChange={(e)=>setUsername(e.target.value)} />
        <input style={{ marginLeft: 8 }} placeholder="password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
        <div style={{ marginTop: 8 }}>
          <button onClick={onRegister}>Register</button>
          <button onClick={onLogin} style={{ marginLeft: 8 }}>Login</button>
        </div>
        <p style={{ color: "#555" }}>{msg}</p>
      </div>

      <div style={{ border: "1px solid #ddd", padding: 16, borderRadius: 8 }}>
        <h3>2) Farm Location → Weather</h3>
        <input placeholder="lat" value={lat} onChange={(e)=>setLat(e.target.value)} />
        <input style={{ marginLeft: 8 }} placeholder="lon" value={lon} onChange={(e)=>setLon(e.target.value)} />
        <button style={{ marginLeft: 8 }} onClick={onGetWeather} disabled={!token}>
          Get Weather
        </button>

        {!token && <p style={{ color: "crimson" }}>Login first to enable weather (JWT protected).</p>}

        {weather && (
          <pre style={{ background: "#111", color: "#0f0", padding: 12, borderRadius: 8, marginTop: 12 }}>
{JSON.stringify(weather, null, 2)}
          </pre>
        )}
      </div>
    </div>
  );
}

