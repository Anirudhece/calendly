"use server";

import { eventSchema } from "@/app/validators/validator";
import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function createEvent(data) {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unautherized");
  }

  const validatedDate = eventSchema.parse(data);

  try {
    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const event = await db.event.create({
      data: {
        ...validatedDate,
        userId: user.id,
      },
    });

    if (!event) {
      throw new Error("event not created");
    }

    return event;

  } catch (err) {
    console.log("err inside events.js:", err);
  }
}
