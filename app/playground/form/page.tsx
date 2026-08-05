import ButtonExample from "@/components/button-example";
import ButtonGroupExample from "@/components/button-group-example";
import CheckboxExample from "@/components/checkbox-example";
import InputExample from "@/components/input-example";
import LabelExample from "@/components/label-example";
import NativeSelectExample from "@/components/native-select-example";
import RadioGroupExample from "@/components/radio-group-example";
import SelectExample from "@/components/select-example";
import SwitchExample from "@/components/switch-example";
import TextareaExample from "@/components/textarea-example";
import ToggleExample from "@/components/toggle-example";
import ToggleGroupExample from "@/components/toggle-group-example";
import { Section } from "@/components/playground/section";

export default function FormPage() {
  return (
    <>
      <Section id="button" title="Button">
        <ButtonExample />
      </Section>
      <Section id="button-group" title="Button Group">
        <ButtonGroupExample />
      </Section>
      <Section id="input" title="Input">
        <InputExample />
      </Section>
      <Section id="label" title="Label">
        <LabelExample />
      </Section>
      <Section id="textarea" title="Textarea">
        <TextareaExample />
      </Section>
      <Section id="native-select" title="Native Select">
        <NativeSelectExample />
      </Section>
      <Section id="select" title="Select">
        <SelectExample />
      </Section>
      <Section id="checkbox" title="Checkbox">
        <CheckboxExample />
      </Section>
      <Section id="radio-group" title="Radio Group">
        <RadioGroupExample />
      </Section>
      <Section id="switch" title="Switch">
        <SwitchExample />
      </Section>
      <Section id="toggle" title="Toggle">
        <ToggleExample />
      </Section>
      <Section id="toggle-group" title="Toggle Group">
        <ToggleGroupExample />
      </Section>
    </>
  );
}
