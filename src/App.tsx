import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { ShopFront, BookDetails } from "./components";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-100 text-slate-900">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <header className="mb-8">
            <Link to="/" className="text-4xl font-semibold tracking-tight text-slate-900">
              Book Shop Front
            </Link>
            <p className="mt-2 max-w-2xl text-base text-slate-600">
              Browse the complete catalog of books fetched from the backend.
            </p>
          </header>

          <Routes>
            <Route path="/" element={<ShopFront />} />
            <Route path="/books/:id" element={<BookDetails />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
