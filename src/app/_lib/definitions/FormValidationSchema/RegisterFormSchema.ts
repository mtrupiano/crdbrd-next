import { z } from "zod";

const RegisterFormSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  password: z.string().min(8, "Password must contain at least 8 characters")
    .refine(str => /[A-Za-z]+/.test(str), "Password must contain an alphabetic character")
    .refine(str => /[0-9]+/.test(str), "Password must contain a number 0-9")
    .refine(str => /[#?!@$ %^&*-]+/.test(str), "Password must contain one special character"),
});

export default RegisterFormSchema;