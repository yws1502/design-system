import Link from "next/link";
import { ExternalLinkIcon } from "lucide-react";

import { Section } from "@/components/playground/section";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

/**
 * 레지스트리 블록 모음.
 *
 * 블록은 컴포넌트가 아니라 완성된 화면이라 갤러리 셸 안에 들어가지 않는다.
 * 각자 showcase 라우트에서 전체 화면으로 열고 여기서는 링크만 건다.
 */
const BLOCKS = [
  {
    href: "/showcase/block-sidebar-07",
    title: "sidebar-07",
    description:
      "팀 전환기, 접히는 네비게이션, 사용자 메뉴가 붙은 완성형 애플리케이션 셸.",
  },
  {
    href: "/showcase/block-login-03",
    title: "login-03",
    description: "muted 배경 위에 카드로 올라간 로그인 화면.",
  },
  {
    href: "/showcase/block-dashboard-01",
    title: "dashboard-01",
    description:
      "차트, 드래그 정렬되는 데이터 테이블, 지표 카드가 붙은 대시보드. 가장 큰 블록이다.",
  },
];

export default function BlocksPage() {
  return (
    <Section id="blocks" title="Blocks">
      <div className="mx-auto min-h-[calc(100vh-3.5rem)] w-full max-w-5xl px-4 py-10 sm:px-6 lg:px-12 2xl:max-w-6xl">
        <p className="text-muted-foreground mb-6 text-sm">
          레지스트리에는 블록이 30개 있지만 전부 넣지 않는다. 서로 같은 라우트와
          컴포넌트 이름을 쓰는 데다, 설치 시 우리가 손댄{" "}
          <span className="font-mono">components/ui/</span> 파일을 덮어쓴다.
          대표적인 것만 격리해서 둔다 — 자세한 근거는 스펙에 있다.
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          {BLOCKS.map((block) => (
            <Card
              key={block.href}
              className="hover:bg-accent relative transition-colors"
            >
              <CardHeader>
                <CardTitle>
                  <Link
                    href={block.href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 after:absolute after:inset-0"
                  >
                    {block.title}
                    <ExternalLinkIcon className="size-4" />
                  </Link>
                </CardTitle>
                <CardDescription>{block.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </Section>
  );
}
