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
      <Section id="toast" title="Toast">
        <ToastExample />
      </Section>
      <Section id="sonner" title="Sonner">
        <SonnerExample />
      </Section>
    </>
  );
}
