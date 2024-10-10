"use client";

import { FormEvent, ReactNode, useState } from "react";
import { FormHelperText, Grid2, Link, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { register } from "./actions";
import { ApiErrorsUIMessage } from "./types";

export default function RegisterFormClient() {
  const [submitting, setSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState({
    email: [],
    password: [],
  });

  const [apiErrors, setApiErrors] = useState([]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    setSubmitting(true);
    try {
      const response = await register(formData);
      if (response?.formValidationErrors) {
        setFormErrors(response.formValidationErrors);
      }

      if (response?.apiErrors) {
        setApiErrors(response.apiErrors);
      }
    } catch (err) {
      // TODO: error handling
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form noValidate={true} autoComplete="off" onSubmit={handleSubmit}>
      <Grid2 container spacing={2} direction="column" alignItems="center">
        <Grid2>
          <TextField
            name="email"
            size="small"
            fullWidth={true}
            sx={{
              width: "300px",
            }}
            label="E-mail"
            error={formErrors?.email?.length > 0}
            helperText={formErrors?.email?.length > 0 && formErrors.email}
          />
        </Grid2>
        <Grid2>
          <TextField
            name="password"
            label="Password"
            type="password"
            size="small"
            fullWidth={true}
            sx={{
              width: "300px",
            }}
            error={formErrors?.password?.length > 0}
            helperText={renderPasswordErrorsHelperText(formErrors?.password)}
          />
        </Grid2>

        {apiErrors.length > 0 && (
          <Grid2>
            <FormHelperText error>
              {apiErrors.map((error) => (
                <span key={`register-api-error-${error}`}>
                  • {ApiErrorsUIMessage[error]}
                </span>
              ))}
            </FormHelperText>
          </Grid2>
        )}

        <Grid2>
          <LoadingButton type="submit" loading={submitting}>
            Register
          </LoadingButton>
        </Grid2>
        <Grid2>
          <Link href="/auth/signin">Already have an account? Sign in here</Link>
        </Grid2>
      </Grid2>
    </form>
  );
}

function renderPasswordErrorsHelperText(
  passwordFormErrors: string[],
): ReactNode | void {
  if (passwordFormErrors.length > 0) {
    return (
      <span>
        {passwordFormErrors.map((error, idx) => (
          <span key={`password-error-${idx}`}>
            • {error}
            <br />
          </span>
        ))}
      </span>
    );
  }
}
