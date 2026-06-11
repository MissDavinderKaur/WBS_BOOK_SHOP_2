import type { Book } from "../types/book";

interface Props {
  book: Book;
}

export default function BookCard({ book }: Props) {
  return (
    <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <img
        src={book.image}
        alt={book.title}
        className="h-64 w-full object-cover"
      />
      <div className="space-y-4 p-5">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">{book.category}</p>
          <h2 className="mt-2 text-xl font-semibold text-slate-900">{book.title}</h2>
          <p className="mt-1 text-sm text-slate-600">by {book.author}</p>
        </div>
        <p className="max-h-20 overflow-hidden text-sm leading-6 text-slate-700">{book.description}</p>
        <div className="flex items-center justify-between gap-4 text-sm text-slate-700">
          <span>Rating: {book.rating?.toFixed(1) ?? "N/A"}</span>
          <span className="font-semibold text-slate-900">${book.price.toFixed(2)}</span>
        </div>
      </div>
    </article>
  );
}
