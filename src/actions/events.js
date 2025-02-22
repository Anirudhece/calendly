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

export const getUserEvents = async () => {
  try {
    const { userId } = await auth();
    if (!userId) {
      throw new Error("Unautherized ‼️");
    }

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    // console.log(`user 🐥:`, user);

    if (!user) {
      throw new Error("User not found ‼️");
    }

    const events = await db.event.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
      include: {
        _count: {
          select: { bookings: true },
        },
      },
    });

    // console.log(`event: 🐥`,events)

    if (!events) {
      throw new Error("event not found ‼️");
    }

    return { events, username: user.username };
  } catch (err) {
    console.error(`error inside getUserEvents:🚩🚩🚩 `, getUserEvents);
  }
};

export const deleteEvent = async (eventId) => {
  try {
    const { userId } = await auth();
    if (!userId) {
      throw new Error("Unautherized ‼️");
    }

    const user= await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) {
      throw new Error("User not found ‼️");
    }

    const event = await db.event.findUnique({
      where: { id: eventId },
    });

    if (!event || event.userId !== user.id) {
      throw new Error("User not found or unautherized ‼️");
    }

    const deleteEvent = await db.event.delete({
      where: { id: eventId },
    });

    if (!deleteEvent) {
      throw new Error("couldnt delete event ‼️");
    }

    return { success: true };
  } catch (err) {
    console.error(`error inside deleteEvent:🚩🚩🚩 `, err);
  }
};
