import CalendarExample from "@/components/calendar-example";
import ComboboxExample from "@/components/combobox-example";
import FieldExample from "@/components/field-example";
import InputGroupExample from "@/components/input-group-example";
import InputOtpExample from "@/components/input-otp-example";
import SliderExample from "@/components/slider-example";
import { Section } from "@/components/playground/section";

export default function FormAdvancedPage() {
  return (
    <>
      <Section id="field" title="Field">
        <FieldExample />
      </Section>
      <Section id="input-group" title="Input Group">
        <InputGroupExample />
      </Section>
      <Section id="input-otp" title="Input OTP">
        <InputOtpExample />
      </Section>
      <Section id="combobox" title="Combobox">
        <ComboboxExample />
      </Section>
      <Section id="calendar" title="Calendar">
        <CalendarExample />
      </Section>
      <Section id="slider" title="Slider">
        <SliderExample />
      </Section>
    </>
  );
}
