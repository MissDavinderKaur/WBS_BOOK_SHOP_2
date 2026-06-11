import ShopFront from "./components/ShopFront.tsx";

export default function App() {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-8">
          <h1 className="text-4xl font-semibold tracking-tight text-slate-900">Book Shop Front</h1>
          <p className="mt-2 max-w-2xl text-base text-slate-600">
            Browse the complete catalog of books fetched from the backend.
          </p>
        </header>
        <ShopFront />
      </div>
    </div>
  );
}
