import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import type { Book } from "../types/book";

export default function BookDetails() {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<any | null>(null);
  const [libraryStatus, setLibraryStatus] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    function syncUser() {
      try {
        const raw = localStorage.getItem("user");
        setUser(raw ? JSON.parse(raw) : null);
      } catch (e) {
        console.error("Failed to parse user from localStorage", e);
      }
    }

    syncUser();
    window.addEventListener("authchange", syncUser);
    window.addEventListener("storage", syncUser);
    return () => {
      window.removeEventListener("authchange", syncUser);
      window.removeEventListener("storage", syncUser);
    };
  }, []);

  useEffect(() => {
    if (!id) return;
    async function load() {
      try {
        const res = await fetch(`/api/books/${id}`);
        if (!res.ok) throw new Error("Failed to fetch book");
        const data = await res.json();
        setBook(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unexpected error");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  async function handleAddToLibrary() {
    if (!user || !book) return;
    setLibraryStatus(null);
    setSaving(true);
    try {
      const response = await fetch("/api/library", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: user.username, bookId: book.id }),
      });
      const data = await response.json();
      if (!response.ok) {
        setLibraryStatus(data.error || "Unable to add book to library");
        return;
      }
      setLibraryStatus("Added to your library!");
    } catch (err) {
      setLibraryStatus(err instanceof Error ? err.message : "Unexpected error");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <div className="p-8">Loading...</div>;
  if (error) return <div className="p-8 text-red-600">{error}</div>;
  if (!book) return <div className="p-8">Book not found.</div>;

  return (
    <div>
        <div className="mt-6">
        <Link to="/" className="text-sm text-blue-600 hover:underline">Back to shop</Link>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="grid gap-6 md:grid-cols-3">
            <img src={book.image} alt={book.title} className="md:col-span-1 h-96 w-full object-cover rounded-lg" />
            <div className="md:col-span-2 flex h-full flex-col">
              <div>
                <h2 className="text-2xl font-semibold">{book.title}</h2>
                <p className="mt-1 text-sm text-slate-600">by {book.author}</p>
                <br></br>
                <p className="text-sm text-slate-700">Rating: {book.rating?.toFixed(1) ?? "N/A"}</p>
                <p className="mt-4 text-slate-700">{book.description}</p>
              </div>

              <div className="mt-auto flex flex-col gap-4 pt-6">
                {user && (
                  <div className="flex items-center justify-end border-t border-slate-200 pt-4">
                    <button
                      onClick={handleAddToLibrary}
                      disabled={saving}
                      className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {saving ? "Adding…" : "Add to my Library"}
                    </button>
                  </div>
                )}
              </div>
            </div>
        </div>
        </div>
    </div>
  );
}
