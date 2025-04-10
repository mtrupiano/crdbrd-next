import RadioButton from "@/app/components/RadioButton";
import RadioButtonGroup from "@/app/components/RadioButtonGroup";
import { Visibility } from "@prisma/client";

export default function VisibilityRadioButtonGroup() {
  return (
    <RadioButtonGroup>
      <RadioButton
        name="visibility"
        id="private"
        inputValueName={Visibility.PRIVATE}
        label="Private"
        defaultChecked={true}
      />
      <RadioButton
        name="visibility"
        id="public"
        inputValueName={Visibility.PUBLIC}
        label="Public"
      />
      <RadioButton
        name="visibility"
        id="unlisted"
        inputValueName={Visibility.UNLISTED}
        label="Unlisted"
      />
    </RadioButtonGroup>
  );
}
