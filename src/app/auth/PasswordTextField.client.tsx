"use client";

import { useState } from "react";
import { Button, TextField, TextFieldProps } from "@mui/material";

export default function PasswordTextField({
  ...muiTextFieldProps
}: {
  muiTextFieldProps: TextFieldProps;
}) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <>
      <TextField
        type={showPassword ? "text" : "password"}
        name="password"
        label={muiTextFieldProps?.label || "Password"}
        {...muiTextFieldProps}
      />
      <Button onClick={() => setShowPassword(!showPassword)}>
        {showPassword ? "Hide" : "Show"} password
      </Button>
    </>
  );
}
