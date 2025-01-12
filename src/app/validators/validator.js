import { z } from "zod";

/** Validation schema for a username - zod validator */
export const usernameSchema = z.object({
    username: z
      .string()
      .min(3)
      .max(20)
      .regex(
        /^[A-Za-z0-9_]+$/,
        "username can only contain letter, number and underScore"
      ),
  });