import React from "react";
import PropTypes from "prop-types";
import { getUserByUserName } from "@/actions/users";
import { notFound } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import EventCard from "@/components/event-card";

export async function generateMetaData({ params }) {
  const { username } = await params;

  const user = await getUserByUserName(username);
  if (!user) {
    return {
      title: "User not found",
    };
  }
  return {
    title: `${user.name}'s Profile | Scheduler`,
    description: `Book an event with ${user.name}`,
  };
}

const UserPage = async ({ params }) => {
  if (!params) {
    throw new Error("params is undefined");
  }
  const { username } = await params;

  const user = await getUserByUserName(username);

  if (!user) {
    notFound();
  }

  console.log("user 🌞:", user);

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center">
          <Avatar className="h-24 w-24 mb-4">
            <AvatarImage src={user.imageUrl} alt={user.name} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
        </div>
        <h1 className="text-3xl text-center font-bold mb-4">{user.name}</h1>
        <p className="text-center ">
          Welcome to my scheduling page. Please select an event bellow to book a
          call with me.
        </p>
      </div>
      <div>
        {user.events.length === 0 ? (
          <p className="text-center">no public events available</p>
        ) : (
          <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
            {user.events.map((event) => (
              <EventCard key={event.id} event={event} username={username} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

UserPage.propTypes = {
  params: PropTypes.shape({
    username: PropTypes.string,
  }).isRequired,
};

export default UserPage;
