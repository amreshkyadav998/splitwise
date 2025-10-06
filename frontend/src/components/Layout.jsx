export default function Layout({ title, children, actions }) {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">{title}</h2>
        <div className="flex items-center gap-2">{actions}</div>
      </div>
      <div>{children}</div>
    </section>
  );
}


