import React from "react";

export default function RadioButtonGroup({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <fieldset>
      <div className="flex space-x-8">{children}</div>
    </fieldset>
  );
}
