import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import type { Book } from "../types/book";

export default function BookDetails() {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
            <div className="md:col-span-2">
            <h2 className="text-2xl font-semibold">{book.title}</h2>
            <p className="mt-1 text-sm text-slate-600">by {book.author}</p>
            <p className="mt-4 text-slate-700">{book.description}</p>

            <div className="mt-6 flex items-center justify-between">
                <div className="text-sm text-slate-700">Rating: {book.rating?.toFixed(1) ?? "N/A"}</div>
                <div className="text-lg font-semibold">${book.price.toFixed(2)}</div>
            </div>
            </div>
        </div>
        </div>
    </div>
  );
}
