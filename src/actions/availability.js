"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function getUserAvailability() {
  try {
    const { userId } = await auth();
    if (!userId) {
      throw new Error("Unautherized ‼️");
    }

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
      include: {
        availability: {
          include: { days: true },
        },
      },
    });

    if (!user || !user.availability) {
      return null;
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

export async function updateAvailability(data) {
  try {
    const { userId } = await auth();

    if (!userId) {
      throw new Error("Unauthorized ‼️");
    }

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
      include: {
        availability: true,
      },
    });

    if (!user) {
      throw new Error("User not found or not available ‼️");
    }

    const availabilityData = Object.entries(data).flatMap(
      ([day, { isAvailable, startTime, endTime }]) => {
        if (isAvailable) {
          const baseDate = new Date().toISOString().split("T")[0];
          return [
            {
              day: day.toUpperCase(),
              startTime: new Date(`${baseDate}T${startTime}`),
              endTime: new Date(`${baseDate}T${endTime}`),
            },
          ];
        }
        return [];
      }
    );

    if (user.availability) {
      await db.dayAvailability.deleteMany({
        where: { availabilityId: user.availability.id },
      });

      await db.availability.update({
        where: { id: user.availability.id },
        data: {
          timeGap: data.timeGap,
          days: {
            create: availabilityData,
          },
        },
      });
    } else {
      // Create new availability if none exists
      await db.availability.create({
        data: {
          userId: user.id,
          timeGap: data.timeGap,
          days: {
            create: availabilityData,
          },
        },
      });
    }

    return { success: true };
  } catch (err) {
    console.error(`error occured inside updateAvailability action 🙀: ${err}`);
    return { success: false };
  }
}
