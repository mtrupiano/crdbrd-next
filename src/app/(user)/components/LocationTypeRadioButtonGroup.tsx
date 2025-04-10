import RadioButton from "@/app/components/RadioButton";
import RadioButtonGroup from "@/app/components/RadioButtonGroup";
import { RealWorldLocationType } from "@prisma/client";

export default function LocationTypeRadioButtonGroup() {
  return (
    <RadioButtonGroup>
      <RadioButton
        name="location-type"
        id="binder"
        inputValueName={RealWorldLocationType.BINDER}
        label="Binder"
        defaultChecked={true}
      />
      <RadioButton
        name="location-type"
        id="cube"
        inputValueName={RealWorldLocationType.CUBE}
        label="Cube"
      />
      <RadioButton
        name="location-type"
        id="deck"
        inputValueName={RealWorldLocationType.DECK}
        label="Deck"
      />
    </RadioButtonGroup>
  );
}
