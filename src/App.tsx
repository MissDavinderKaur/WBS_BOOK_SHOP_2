import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { ShopFront, BookDetails, RegisterForm, LoginForm } from "./components";

export default function App() {
  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("user");
      if (raw) setUser(JSON.parse(raw));
    } catch (e) {
      console.error("Failed to parse user from localStorage", e);
    }
  }, []);

  function handleLogout() {
    localStorage.removeItem("user");
    setUser(null);
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-100 text-slate-900">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <header className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/" className="text-4xl font-semibold tracking-tight text-slate-900">Book Shop</Link>
            </div>
            <nav className="flex gap-3">
              {!user && (
                <>
                  <Link to="/register" className="rounded-md bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50">Register</Link>
                  <Link to="/login" className="rounded-md bg-slate-800 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-slate-900">Log In</Link>
                </>
              )}
              {user && (
                <button onClick={handleLogout} className="rounded-md bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50">
                  Log Out
                </button>
              )}
            </nav>
          </header>

          <Routes>
            <Route path="/" element={<ShopFront />} />
            <Route path="/books/:id" element={<BookDetails />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/login" element={<LoginForm />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
