import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Login failed");
        return;
      }
      // store user and navigate on success
      try {
        localStorage.setItem("user", JSON.stringify(data));
        window.dispatchEvent(new Event("authchange"));
      } catch (e) {
        console.error("Failed to save user to localStorage", e);
      }
      navigate("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <h2 className="mb-4 text-2xl font-semibold">Log In</h2>
        <form onSubmit={handleSubmit} className="space-y-4 rounded bg-white p-6 shadow">
        {error && <div className="text-sm text-red-600">{error}</div>}
        <div>
          <label className="block text-sm font-medium text-slate-700">Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 w-full rounded border px-3 py-2" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 w-full rounded border px-3 py-2" required />
        </div>
        <div className="flex items-center justify-end">
          <button type="submit" disabled={loading} className="rounded bg-slate-800 px-4 py-2 text-white">
            {loading ? "Logging in…" : "Log In"}
          </button>
        </div>
        </form>
      </div>
    </div>
  );
}
