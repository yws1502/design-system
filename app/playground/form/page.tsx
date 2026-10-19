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
import ButtonDestructiveDemo from "@/components/playground/button-destructive-demo";
import ButtonDisabledDemo from "@/components/playground/button-disabled-demo";
import SearchInputDemo from "@/components/playground/search-input-demo";
import { Section } from "@/components/playground/section";

export default function FormPage() {
  return (
    <>
      <Section id="button" title="Button">
        <ButtonExample />
      </Section>
      <Section
        id="button-destructive"
        title="Button — Destructive"
        description="최종 확인은 destructive(Solid), 목록·인라인처럼 반복되거나 확인 단계로 들어가는 진입점은 destructive-soft. 같은 화면에 Solid가 여러 개면 위험 신호가 무뎌진다."
      >
        <ButtonDestructiveDemo />
      </Section>
      <Section
        id="button-disabled"
        title="Button — Disabled"
        description="공식 예제에 disabled 케이스가 없어 따로 전시한다. 모든 variant가 opacity 50%로 흐려지고 클릭·hover를 받지 않는다."
      >
        <ButtonDisabledDemo />
      </Section>
      <Section id="button-group" title="Button Group">
        <ButtonGroupExample />
      </Section>
      <Section id="input" title="Input">
        <InputExample />
      </Section>
      <Section
        id="search-input"
        title="Search Input"
        description="패턴(components/patterns/search-input). 값이 있으면 오른쪽에 지우기 아이콘 버튼이 나오고, Esc로도 지운다. 사이드바 검색창이 이 컴포넌트를 쓴다."
      >
        <SearchInputDemo />
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
