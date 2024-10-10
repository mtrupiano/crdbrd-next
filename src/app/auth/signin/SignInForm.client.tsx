"use client";
import { FormEvent } from "react";
import { TextField, Button, Grid2, Link } from "@mui/material";
import { signIn as nextAuthSignIn } from "next-auth/react";

export default function SignInFormClient() {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    nextAuthSignIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
    });
  };

  return (
    <form noValidate={true} autoComplete="off" onSubmit={handleSubmit}>
      <Grid2 container spacing={2} direction="column" alignItems="center">
        <Grid2>
          <TextField
            name="email"
            id="email"
            label="E-mail"
            size="small"
            fullWidth={true}
            sx={{
              width: "300px",
            }}
          />
        </Grid2>
        <Grid2>
          <TextField
            type="password"
            name="password"
            label="Password"
            size="small"
            fullWidth={true}
            sx={{
              width: "300px",
            }}
          />
        </Grid2>
        <Grid2>
          <Button type="submit">Sign In</Button>
        </Grid2>
        <Grid2>
          <Link href="/auth/register">
            {"Don't have an account? Sign up here"}
          </Link>
        </Grid2>
      </Grid2>
    </form>
  );
}
