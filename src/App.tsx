import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { ShopFront, BookDetails, RegisterForm, LoginForm } from "./components";

export default function App() {
  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    function syncUser() {
      try {
        const raw = localStorage.getItem("user");
        setUser(raw ? JSON.parse(raw) : null);
      } catch (e) {
        console.error("Failed to parse user from localStorage", e);
      }
    }

    // initial sync
    syncUser();

    // update when other parts of the app dispatch auth changes or storage events
    window.addEventListener("authchange", syncUser);
    window.addEventListener("storage", syncUser);
    return () => {
      window.removeEventListener("authchange", syncUser);
      window.removeEventListener("storage", syncUser);
    };
  }, []);

  const [libraryMessage, setLibraryMessage] = useState<string | null>(null);

  async function handleMyLibrary() {
    if (!user) return;
    setLibraryMessage(null);
    try {
      const response = await fetch(`/api/library/${encodeURIComponent(user.username)}`);
      const data = await response.json();
      if (!response.ok) {
        setLibraryMessage(data.error || "Failed to load library");
        return;
      }
      setLibraryMessage(`Loaded ${Array.isArray(data) ? data.length : 0} library book(s)`);
      console.log("Library books:", data);
    } catch (err) {
      setLibraryMessage(err instanceof Error ? err.message : "Unexpected error");
    }
  }

  function handleLogout() {
    localStorage.removeItem("user");
    setUser(null);
    window.dispatchEvent(new Event("authchange"));
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
              {user && (
                <button onClick={handleMyLibrary} className="rounded-md bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50">
                  My Library
                </button>
              )}
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
          {libraryMessage && (
            <div className="mb-4 rounded-md bg-slate-50 p-3 text-slate-700 shadow-sm">
              {libraryMessage}
            </div>
          )}

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
