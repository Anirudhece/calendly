import { getUserAvailability } from "@/actions/availability";
import React from "react";
import { defaultAvailability } from "./data";
import AvailabilityForm from "./_components/availability-form";

const AvailablilityPage = async () => {
  const availability = await getUserAvailability();

  return (
    <div>
      <AvailabilityForm initialData={availability || defaultAvailability} />
    </div>
  );
};

export default AvailablilityPage;
