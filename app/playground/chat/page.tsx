import AttachmentExample from "@/components/attachment-example";
import BubbleExample from "@/components/bubble-example";
import MarkerExample from "@/components/marker-example";
import { Section } from "@/components/playground/section";

export default function ChatPage() {
  return (
    <>
      <Section id="attachment" title="Attachment">
        <AttachmentExample />
      </Section>
      <Section id="bubble" title="Bubble">
        <BubbleExample />
      </Section>
      <Section id="marker" title="Marker">
        <MarkerExample />
      </Section>
    </>
  );
}
