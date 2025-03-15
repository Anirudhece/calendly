"use server";
import { db } from "@/lib/prisma";
import { auth, clerkClient } from "@clerk/nextjs/server";

const updateUsername = async (username) => {
  if (!username || typeof username !== "string" || username.trim() === "") {
    throw new Error("Invalid username");
  }

  const isValidUsername = /^[a-zA-Z0-9]*[a-zA-Z][a-zA-Z0-9]*$/.test(username);
  if (!isValidUsername) {
    throw new Error(
      "Username must contain at least one non-numeric character."
    );
  }

  const { userId } = await auth();
  if (!userId) {
    throw new Error("User not found");
  }

  try {
    const existingUsername = await db.user.findUnique({
      where: { username },
    });

    if (existingUsername && existingUsername.id !== userId) {
      throw new Error("Username already taken");
    }

    await db.user.update({
      where: { clerkUserId: userId },
      data: { username },
    });

    const { users: ClerkUser } = await clerkClient();
    await ClerkUser.updateUser(userId, { username });

    return { success: true };
  } catch (err) {
    console.error("Error in updateUsername:", err);
    throw new Error(err.message || "Failed to update user");
  }
};

const getUserByUserName = async (username) => {
  try {
    const user = await db.user.findUnique({
      where: { username },
      select: {
        id: true,
        name: true,
        email: true,
        imageUrl: true,
        events: {
          where: {
            isPrivate: false,
          },
          orderBy: {
            createdAt: "desc",
          },
          select: {
            id: true,
            title: true,
            description: true,
            duration: true,
            isPrivate: true,
            _count: {
              select: { bookings: true },
            },
          },
        },
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  } catch (err) {
    return null;
  }
};

export { updateUsername, getUserByUserName };
