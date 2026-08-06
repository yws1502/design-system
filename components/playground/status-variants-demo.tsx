"use client";

import {
  CircleCheckIcon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react";

import { Example, ExampleWrapper } from "@/components/example";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";

/**
 * `--success` / `--warning` 토큰으로 넓힌 상태 variant.
 *
 * 원본에는 `destructive`만 있었다. 토큰을 toast에 쓰려고 추가한 김에 Alert과
 * Badge까지 넓혔다. `info`는 여전히 중립이다 — 주의를 끌 이유가 없는 상태에
 * 색을 붙이면 나머지 상태의 신호가 약해진다.
 */
const ALERTS = [
  {
    variant: "success" as const,
    icon: CircleCheckIcon,
    title: "배포가 완료되었습니다",
    description: "12개 파일이 반영되었습니다.",
  },
  {
    variant: "warning" as const,
    icon: TriangleAlertIcon,
    title: "인증서가 곧 만료됩니다",
    description: "14일 뒤 만료됩니다. 미리 갱신하세요.",
  },
  {
    variant: "destructive" as const,
    icon: OctagonXIcon,
    title: "빌드에 실패했습니다",
    description: "타입 오류 3건을 해결해야 합니다.",
  },
];

const BADGES = [
  { variant: "success" as const, label: "정상" },
  { variant: "warning" as const, label: "점검 필요" },
  { variant: "destructive" as const, label: "중단" },
  { variant: "secondary" as const, label: "대기" },
  { variant: "outline" as const, label: "보관" },
];

export default function StatusVariantsDemo() {
  return (
    <ExampleWrapper>
      <Example title="Alert">
        {ALERTS.map((item) => (
          <Alert key={item.variant} variant={item.variant}>
            <item.icon />
            <AlertTitle>{item.title}</AlertTitle>
            <AlertDescription>{item.description}</AlertDescription>
          </Alert>
        ))}
      </Example>

      <Example title="Badge">
        <div className="flex w-full flex-wrap gap-2">
          {BADGES.map((badge) => (
            <Badge key={badge.label} variant={badge.variant}>
              {badge.label}
            </Badge>
          ))}
        </div>
        <div className="flex w-full flex-wrap gap-2">
          <Badge variant="success">
            <CircleCheckIcon />
            정상
          </Badge>
          <Badge variant="warning">
            <TriangleAlertIcon />
            점검 필요
          </Badge>
          <Badge variant="destructive">
            <OctagonXIcon />
            중단
          </Badge>
        </div>
      </Example>
    </ExampleWrapper>
  );
}
