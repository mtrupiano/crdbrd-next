"use client"

import { FormEvent, useState } from "react";
import { Grid2, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";

export default function RegisterFormClient() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    const response = await fetch('/api/auth/register', {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
    });

    setSubmitting(false);

    console.log(response);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid2 container spacing={2} direction="column" alignItems="center">
        <Grid2>
          <TextField
            label="E-mail"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </Grid2>
        <Grid2>
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </Grid2>
        <Grid2>
          <LoadingButton
            type="submit"
            loading={submitting}
          >
            Register
          </LoadingButton>
        </Grid2>
      </Grid2>
    </form>
  );
};