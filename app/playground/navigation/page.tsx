import AccordionExample from "@/components/accordion-example";
import BreadcrumbExample from "@/components/breadcrumb-example";
import CollapsibleExample from "@/components/collapsible-example";
import NavigationMenuExample from "@/components/navigation-menu-example";
import PaginationExample from "@/components/pagination-example";
import TabsExample from "@/components/tabs-example";
import { Section } from "@/components/playground/section";

export default function NavigationPage() {
  return (
    <>
      <Section id="tabs" title="Tabs">
        <TabsExample />
      </Section>
      <Section id="accordion" title="Accordion">
        <AccordionExample />
      </Section>
      <Section id="collapsible" title="Collapsible">
        <CollapsibleExample />
      </Section>
      <Section id="breadcrumb" title="Breadcrumb">
        <BreadcrumbExample />
      </Section>
      <Section id="navigation-menu" title="Navigation Menu">
        <NavigationMenuExample />
      </Section>
      <Section id="pagination" title="Pagination">
        <PaginationExample />
      </Section>
    </>
  );
}
