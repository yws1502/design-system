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
      // ExampleWrapper 는 예제 하나가 화면을 통째로 쓰는 전제라 min-h-screen 이 걸려 있다.
      // 섹션을 쌓는 갤러리에선 제목 아래 빈 공간이 되므로 원본을 두고 여기서 끈다.
      className="bg-muted dark:bg-background scroll-mt-14 [&_[data-slot=example-wrapper]]:min-h-0"
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
