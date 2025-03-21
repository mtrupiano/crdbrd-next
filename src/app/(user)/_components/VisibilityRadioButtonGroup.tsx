import RadioButton from "@/app/components/RadioButton";
import RadioButtonGroup from "@/app/components/RadioButtonGroup";

export default function VisibilityRadioButtonGroup({
  fieldName,
}: ReadOnly<{ fieldName: string }>) {
  return (
    <RadioButtonGroup>
      <RadioButton
        name={fieldName}
        id="public"
        inputValueName="public"
        label="Public"
      />
      <RadioButton
        name={fieldName}
        id="unlisted"
        inputValueName="unlisted"
        label="Unlisted"
      />
      <RadioButton
        name={fieldName}
        id="private"
        inputValueName="private"
        label="Private"
        defaultChecked={true}
      />
    </RadioButtonGroup>
  );
}
