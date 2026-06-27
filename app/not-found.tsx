import Link from "next/link";

export default function NotFound() {
  return (
    <div className="py-16 text-center">
      <p className="text-4xl">🧭</p>
      <h1 className="mt-2 text-2xl font-bold">Seite nicht gefunden</h1>
      <p className="mt-1 text-ink/50">That page doesn&apos;t exist.</p>
      <Link href="/" className="btn-primary mt-5">
        Back to Today
      </Link>
    </div>
  );
}
