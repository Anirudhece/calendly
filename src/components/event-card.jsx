/* eslint-disable react/prop-types */
"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Link, Trash, Loader2 } from "lucide-react";
import { deleteEvent } from "@/actions/events";
import useFetch from "@/hooks/use-fetch";

const EventCard = ({ event, username }) => {
  const router = useRouter();
  const [isCopied, setIsCopied] = useState(false);

  const description = event.description.substring(
    0,
    event.description.indexOf(".") === -1
      ? event.description.length
      : event.description.indexOf(".")
  );

  const handleCopy = async (e) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(
        `${window.location.origin}/${username}/${event.id}`
      );
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (err) {
      console.log("failed to copy", err);
    }
  };

  const { loading, fn: fnDeleteEvent } = useFetch(deleteEvent);

  const handleDelete = async (e) => {
    e.stopPropagation();
    if (window?.confirm("Are you sure you want to delete this event?")) {
      await fnDeleteEvent(event.id);
      router.refresh();
    }
  };

  const handleCardClick = (e) => {

    if (e.target.tagName !== "BUTTON" && e.target.tagName !== "SVG") {
      window?.open(`${window.location.origin}/${username}/${event.id}`,"_blank");
    }
  };

  return (
    <>
      <Card
        onClick={handleCardClick}
        className="cursor-pointer flex flex-col justify-between"
      >
        <CardHeader>
          <CardTitle className="text-xl">{event?.title}</CardTitle>
          <CardDescription className="flex justify-between">
            <span>
              {event?.duration} mins | {event?.isPrivate ? "Private" : "Public"}
            </span>
            <span>{event?._count.bookings} Bookings</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>{description}</p>
        </CardContent>

        <CardFooter>
          <Button
            disabled={isCopied}
            variant="outline"
            size="sm"
            onClick={handleCopy}
          >
            {" "}
            <Link /> {isCopied ? "Copied!" : "Copy Link"}
          </Button>
          <Button
            onClick={handleDelete}
            className="ml-2"
            variant="destructive"
            size="sm"
            disabled={loading}
          >
            {" "}
            {loading ? <Loader2 className="animate-spin" /> : <Trash />} Delete
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default EventCard;
