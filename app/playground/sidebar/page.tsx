import Link from "next/link";
import { ExternalLinkIcon } from "lucide-react";

import { Section } from "@/components/playground/section";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const SHOWCASES = [
  {
    href: "/showcase/sidebar",
    title: "Sidebar",
    description: "기본 사이드바. 그룹으로 묶인 네비게이션.",
  },
  {
    href: "/showcase/sidebar-icon",
    title: "Sidebar — Icon",
    description: "아이콘으로 접히는 사이드바.",
  },
  {
    href: "/showcase/sidebar-inset",
    title: "Sidebar — Inset",
    description: "본문이 안쪽으로 들어간 inset 변형.",
  },
  {
    href: "/showcase/sidebar-floating",
    title: "Sidebar — Floating",
    description: "떠 있는 형태의 floating 변형.",
  },
];

export default function SidebarPage() {
  return (
    <Section id="sidebar" title="Sidebar">
      <div className="mx-auto min-h-[calc(100vh-3.5rem)] w-full max-w-5xl px-4 py-10 sm:px-6 lg:px-12 2xl:max-w-6xl">
        <p className="text-muted-foreground mb-6 text-sm">
          Sidebar 예제는 각자 SidebarProvider를 렌더하는 전체 페이지 레이아웃이라
          갤러리 셸 안에서는 Provider가 중첩된다. 별도 라우트에서 연다.
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          {SHOWCASES.map((showcase) => (
            <Card
              key={showcase.href}
              className="relative transition-colors hover:bg-accent"
            >
              <CardHeader>
                <CardTitle>
                  <Link
                    href={showcase.href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 after:absolute after:inset-0"
                  >
                    {showcase.title}
                    <ExternalLinkIcon className="size-4" />
                  </Link>
                </CardTitle>
                <CardDescription>{showcase.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </Section>
  );
}
