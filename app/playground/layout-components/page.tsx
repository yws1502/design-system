import CarouselExample from "@/components/carousel-example";
import ResizableExample from "@/components/resizable-example";
import ScrollAreaExample from "@/components/scroll-area-example";
import { Section } from "@/components/playground/section";

export default function LayoutComponentsPage() {
  return (
    <>
      <Section id="scroll-area" title="Scroll Area">
        <ScrollAreaExample />
      </Section>
      <Section id="resizable" title="Resizable">
        <ResizableExample />
      </Section>
      <Section id="carousel" title="Carousel">
        <CarouselExample />
      </Section>
    </>
  );
}
