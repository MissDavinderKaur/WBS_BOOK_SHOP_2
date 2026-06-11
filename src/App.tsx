import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { ShopFront, BookDetails, RegisterForm, LoginForm } from "./components";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-100 text-slate-900">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <header className="mb-8 flex items-center justify-between">
            <div>
              <Link to="/" className="text-4xl font-semibold tracking-tight text-slate-900">Book Shop</Link>
            </div>
            <nav className="flex gap-3">
              <Link to="/register" className="rounded-md bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50">Register</Link>
              <Link to="/login" className="rounded-md bg-slate-800 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-slate-900">Log In</Link>
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
