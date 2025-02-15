"use client";

import React, { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useSearchParams, useRouter } from "next/navigation";
import EventForm from "./event-form";

export default function DrawerDemo() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const create = searchParams.get("create");
    if (create) {
      setIsOpen(true);
    }
  }, [searchParams]);

  const handleClose = () => {
    setIsOpen(false);
    if (searchParams.get("create") === "true")
      router.push(window?.location?.pathname);
  };

  return (
    <Drawer open={isOpen} onClose={handleClose}>
      <DrawerContent>
        <div className="mx-auto w-full max-w-lg">
        <DrawerHeader>
          <DrawerTitle>Create new Event</DrawerTitle>
          {/* <DrawerDescription>Set your daily activity goal.</DrawerDescription> */}
        </DrawerHeader>
        <div className="p-4 pb-0">
          <EventForm onSubmit={() => handleClose} />
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button onClick={handleClose} variant="outline">
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
