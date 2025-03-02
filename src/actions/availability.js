"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function getUserAvailability() {
  try {
    const { userId } = await auth();
    if (!userId) {
      throw new Error("Unautherized ‼️");
    }

    // const user = await db.user.findUnique({
    //   where: { clerkUserId: userId },
    //   include: {
    //     availability: { days: true },
    //   },
    // });

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
      include: {
        availability: {
          include: { days: true }, // Use `include` instead of direct property access
        },
      },
    });
    
    if (!user || !user.availability) {
      return null
      // throw new Error("User not found or not available ‼️");
    }

    const availabilityData = { timeGap: user.availability.timeGap };

    [
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
      "sunday",
    ].forEach((day) => {
      const dayAvailability = user.availability.days.find(
        (d) => d.day === day.toUpperCase()
      );

      availabilityData[day] = {
        isAvailable: !!dayAvailability,
        startTime: dayAvailability
          ? dayAvailability.startTime.toISOString().slice(11, 16)
          : "09:00",
        endTime: dayAvailability
          ? dayAvailability.endTime.toISOString().slice(11, 16)
          : "17:00",
      };
    });

    return availabilityData;
  } catch (err) {
    console.error(`error occured inside availability action 🙀: ${err}`);
    return null;
  }
}
