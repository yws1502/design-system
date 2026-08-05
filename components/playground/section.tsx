export function Section({
  id,
  title,
  description,
  children,
}: {
  id: string;
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className="bg-muted dark:bg-background scroll-mt-14"
    >
      <div className="mx-auto w-full max-w-5xl px-4 pt-10 sm:px-6 lg:px-12 2xl:max-w-6xl">
        <h2 id={`${id}-heading`} className="text-2xl font-semibold tracking-tight">
          {title}
        </h2>
        {description ? (
          <p className="text-muted-foreground text-sm">{description}</p>
        ) : null}
      </div>
      {children}
    </section>
  );
}
