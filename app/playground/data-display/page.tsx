import AspectRatioExample from "@/components/aspect-ratio-example";
import AvatarExample from "@/components/avatar-example";
import BadgeExample from "@/components/badge-example";
import CardExample from "@/components/card-example";
import EmptyExample from "@/components/empty-example";
import ItemExample from "@/components/item-example";
import KbdExample from "@/components/kbd-example";
import ProgressExample from "@/components/progress-example";
import SeparatorExample from "@/components/separator-example";
import SkeletonExample from "@/components/skeleton-example";
import SpinnerExample from "@/components/spinner-example";
import TableExample from "@/components/table-example";
import { Section } from "@/components/playground/section";

export default function DataDisplayPage() {
  return (
    <>
      <Section id="card" title="Card">
        <CardExample />
      </Section>
      <Section id="table" title="Table">
        <TableExample />
      </Section>
      <Section id="badge" title="Badge">
        <BadgeExample />
      </Section>
      <Section id="avatar" title="Avatar">
        <AvatarExample />
      </Section>
      <Section id="separator" title="Separator">
        <SeparatorExample />
      </Section>
      <Section id="skeleton" title="Skeleton">
        <SkeletonExample />
      </Section>
      <Section id="item" title="Item">
        <ItemExample />
      </Section>
      <Section id="empty" title="Empty">
        <EmptyExample />
      </Section>
      <Section id="kbd" title="Kbd">
        <KbdExample />
      </Section>
      <Section id="spinner" title="Spinner">
        <SpinnerExample />
      </Section>
      <Section id="progress" title="Progress">
        <ProgressExample />
      </Section>
      <Section id="aspect-ratio" title="Aspect Ratio">
        <AspectRatioExample />
      </Section>
    </>
  );
}
