export function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className="bg-muted dark:bg-background scroll-mt-14"
    >
      <div className="mx-auto w-full max-w-5xl px-4 pt-10 sm:px-6 lg:px-12 2xl:max-w-6xl">
        <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
      </div>
      {children}
    </section>
  );
}
