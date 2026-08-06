import AlertExample from "@/components/alert-example";
import SonnerExample from "@/components/sonner-example";
import ToastExample from "@/components/toast-example";
import { Section } from "@/components/playground/section";
import ToastStatusDemo from "@/components/playground/toast-status-demo";

export default function FeedbackPage() {
  return (
    <>
      <Section id="alert" title="Alert">
        <AlertExample />
      </Section>
      <Section
        id="toast"
        title="Toast"
        description="Base UI 기반 구현. shadcn 에이전트 가이드(.claude/skills/shadcn)는 Base UI 프로젝트에 이쪽을 권장한다 — 다만 공식 문서 페이지에는 그런 문구가 없다."
      >
        <ToastExample />
      </Section>
      <Section
        id="sonner"
        title="Sonner"
        description="sonner 패키지 기반. 같은 가이드가 Radix / React Aria 프로젝트용으로 안내한다. 공식 문서에 deprecated 표기는 없고 이 프로젝트에서도 정상 동작한다."
      >
        <SonnerExample />
      </Section>
      <Section
        id="toast-status"
        title="Toast — 상태"
        description="success / info / warning / error / loading. 공식 예제가 기본형만 다뤄서 상태 케이스는 따로 전시한다. 색은 --success · --warning · --destructive 토큰을 쓰고, info와 loading은 중립색을 유지한다."
      >
        <ToastStatusDemo />
      </Section>
    </>
  );
}
