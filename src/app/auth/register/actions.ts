"use server";

import { RegisterFormSchema } from "@/app/lib/definitions";
import { RegisterActionResponse } from "./types";
import { signIn } from "@/lib/auth/helpers";

export async function register(formData: FormData): RegisterActionResponse {
  // Putting form data validation in server action as opposed to API endpoint
  // to potentially implement useActionState in the future

  const email = formData.get("email").trim();
  const password = formData.get("password");
  const validationResult = RegisterFormSchema.safeParse({
    email,
    password,
  });

  if (!validationResult.success) {
    return {
      formValidationErrors: validationResult.error.flatten().fieldErrors,
    };
  }

  const response = await fetch(
    `${process.env.NEXTJS_SERVER_URL}/api/auth/register`,
    {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (!response.ok) {
    return {
      apiErrors: (await response.json())?.errors,
    };
  } else {
    return await signIn("credentials", { callbackUrl: "" });
  }
}
