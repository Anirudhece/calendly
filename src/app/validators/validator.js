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

export const eventSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Title must be at least 1 characters long" })
    .max(100, { message: "Title must be at most 100 characters long" }),

  description: z
    .string()
    .min(1, { message: "Description must be at least 1 characters long" })
    .max(500, { message: "Description must be at most 500 characters long" }),

  duration: z.number().int().positive("duration must be a positive number"),

  isPrivate: z.boolean(),
});

export const daySchema = z
  .object({
    isAvailable: z.boolean(),
    startTime: z.string().optional(),
    endTime: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.isAvailable) {
        return data.startTime < data.endTime;
      }
      return true;
    },
    {
      message: "End time must be more than start time",
      path: ["endTime"],
    }
  );

export const availabilitySchema = z.object({
  monday: daySchema,
  tuesday: daySchema,
  wednesday: daySchema,
  thursday: daySchema,
  friday: daySchema,
  saturday: daySchema,
  sunday: daySchema,
  timeGap: z.number().min(0, "Time gap must be 0 or more minutes").int(),
});
