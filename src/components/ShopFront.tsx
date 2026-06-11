import { useEffect, useState } from "react";
import BookCard from "./BookCard";
import type { Book } from "../types/book";

export default function ShopFront() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadBooks() {
      try {
        const response = await fetch("/api/books");
        if (!response.ok) {
          throw new Error("Failed to load books");
        }
        const data = await response.json();
        setBooks(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unexpected error");
      } finally {
        setLoading(false);
      }
    }

    loadBooks();
  }, []);

  if (loading) {
    return <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-700 shadow-sm">Loading books…</div>;
  }

  if (error) {
    return <div className="rounded-3xl border border-red-200 bg-red-50 p-10 text-center text-red-700 shadow-sm">{error}</div>;
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {books.map((book) => (
          <BookCard key={book._id} book={book} />
        ))}
      </div>
      {books.length === 0 && (
        <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center text-slate-500 shadow-sm">
          No books available.
        </div>
      )}
    </div>
  );
}
