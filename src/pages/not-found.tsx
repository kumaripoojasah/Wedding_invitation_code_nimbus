export default function NotFound() {
  return (
    <main className="min-h-screen w-full flex items-center justify-center p-6">
      <section className="text-center">
        <p className="text-sm uppercase tracking-[0.2em]">404</p>
        <h1 className="mt-3 text-3xl font-semibold">Page not found</h1>
        <a className="mt-6 inline-block underline" href="/">
          Return home
        </a>
      </section>
    </main>
  );
}