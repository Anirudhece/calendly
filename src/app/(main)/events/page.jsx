import { getUserEvents } from "@/actions/events";
import EventCard from "@/components/event-card";
import React, { Suspense } from "react";

const Events = async () => {
  const { events, username } = await getUserEvents();

  if (!events?.length) {
    return <p>you havent created any event yet</p>;
  }
  return (
    <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
      {events.map((event) => {
        return <EventCard event={event} key={event.id} username={username} />;
      })}
    </div>
  );
};

const EventPage = () => {
  return (
    <Suspense fallback={<div>loading...</div>}>
      <Events />
    </Suspense>
  );
};

export default EventPage;
