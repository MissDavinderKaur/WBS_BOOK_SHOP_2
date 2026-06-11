import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { Book } from "../types/book";

export default function Library() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const rawUser = localStorage.getItem("user");
    if (!rawUser) {
      setError("Please log in to view your library.");
      setLoading(false);
      return;
    }

    let user: { username?: string; [key: string]: unknown } | null = null;
    try {
      user = JSON.parse(rawUser);
    } catch (err) {
      setError("Unable to read logged in user.");
      setLoading(false);
      return;
    }

    if (!user?.username) {
      setError("Please log in to view your library.");
      setLoading(false);
      return;
    }

    const username = user.username;

    async function loadLibrary() {
      try {
        const response = await fetch(`/api/library/${encodeURIComponent(username)}`);
        const data = await response.json();
        if (!response.ok) {
          setError(data.error || "Failed to load library.");
          return;
        }
        setBooks(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unexpected error");
      } finally {
        setLoading(false);
      }
    }

    loadLibrary();
  }, []);

  if (loading) {
    return <div className="p-8 text-slate-700">Loading your library…</div>;
  }

  if (error) {
    return (
      <div className="p-8 text-slate-700">
        <p className="mb-4 text-red-600">{error}</p>
        <Link to="/login" className="rounded bg-slate-800 px-4 py-2 text-sm font-medium text-white hover:bg-slate-900">
          Log In
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">My Library</h1>
        <Link to="/" className="text-sm text-blue-600 hover:underline">Back to shop</Link>
      </div>

      {books.length === 0 ? (
        <div className="rounded-xl border border-slate-200 bg-white p-6 text-slate-700 shadow-sm">
          You have no books in your library yet.
        </div>
      ) : (
        <ul className="space-y-3">
          {books.map((book) => (
            <li key={book.id} className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
              <img src={book.image} alt={book.title} className="h-12 w-12 flex-none rounded object-cover" />
              <div>
                <p className="font-semibold text-slate-900">{book.title}</p>
                <p className="text-sm text-slate-600">{book.author}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
