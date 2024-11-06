import { z } from "zod";

export const SignUpSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email(),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const SignInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type SignupInput = z.infer<typeof SignUpSchema>;
export type SigninInput = z.infer<typeof SignInSchema>;
