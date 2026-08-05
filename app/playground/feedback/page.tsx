import AlertExample from "@/components/alert-example";
import SonnerExample from "@/components/sonner-example";
import ToastExample from "@/components/toast-example";
import { Section } from "@/components/playground/section";

export default function FeedbackPage() {
  return (
    <>
      <Section id="alert" title="Alert">
        <AlertExample />
      </Section>
      <Section
        id="toast"
        title="Toast"
        description="이 프로젝트는 Base UI 기반이므로 Toast가 권장되는 선택지다."
      >
        <ToastExample />
      </Section>
      <Section
        id="sonner"
        title="Sonner"
        description="Sonner는 Radix / React Aria 프로젝트를 위한 옵션이다."
      >
        <SonnerExample />
      </Section>
    </>
  );
}
