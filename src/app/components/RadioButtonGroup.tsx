import React from "react";
import RadioButton from "./RadioButton";
type RadioButtonType = typeof RadioButton;
export default function RadioButtonGroup({
  children,
}: ReadOnly<{
  children: RadioButtonType[];
}>) {
  return (
    <fieldset>
      <div className="flex space-x-8">{children}</div>
    </fieldset>
  );
}
