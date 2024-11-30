import { currentUser, auth, clerkClient } from "@clerk/nextjs/server";
import { db } from "./prisma";

/**
 * Checks if the current user exists in the database and creates a new user if they don't.
 * Also updates the Clerk user with a generated username if it doesn't exist.
 *
 * @returns {Promise<newUser | null>} The user object from the database or null if not found.
 */
export const checkUser = async () => {
  const user = await currentUser();
  if (!user) return null;

  try {
    const logedInUser = db.user.findUnique({
      where: { clerkUserId: user.id },
    });

    if (logedInUser) return logedInUser;

    const name = user.firstName + " " + user.lastName;

    await clerkClient().users.updateUser(user.id, {
      username: name.split(" ").join("-") + user.id.slice(-4),
    });

    const newUser = await db.user.create({
      data: {
        clerkUserId: user.id,
        name: name,
        imageUrl: user.imageUrl,
        email: user.emailAddresses[0].emailAddress,
        username: name.split(" ").join("-") + user.id.slice(-4),
      },
    });

    return newUser;
  } catch (err) {
    console.log(err);
  }
};
