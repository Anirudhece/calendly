import { z } from "zod";

/** Validation schema for a username - zod validator */
export const usernameSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long" })
    .max(20, { message: "Username must be at most 20 characters long" })
    .regex(
      /^[A-Za-z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores"
    )
    .regex(
      /[A-Za-z]/,
      "Username must contain at least one non-numeric character"
    ),
});
