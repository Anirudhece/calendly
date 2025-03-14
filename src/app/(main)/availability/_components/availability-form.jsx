"use client";
import React from "react";
import { availabilitySchema } from "@/app/validators/validator";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { timeSlots } from "../data";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useFetch from "@/hooks/use-fetch";
import { updateAvailability } from "@/actions/availability";

// eslint-disable-next-line react/prop-types
const AvailabilityForm = ({ initialData }) => {

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: initialData,
    resolver: zodResolver(availabilitySchema),
  });

  const {
    fn: fnUpdateAvailability,
    loading,
    error,
  } = useFetch(updateAvailability);

  const onSubmit = async (data) => {
    await fnUpdateAvailability(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {[
          "monday",
          "tuesday",
          "wednesday",
          "thursday",
          "friday",
          "saturday",
          "sunday",
        ].map((day) => {
          const isAvailable = watch(`${day}.isAvailable`);

          return (
            <div key={day} className="flex items-center mb-4 space-x-4">
              <Controller
                name={`${day}.isAvailable`}
                control={control}
                render={(field) => {
                  return (
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={(checked) => {
                        setValue(`${day}.isAvailable`, checked);
                      }}
                    />
                  );
                }}
              />
              <span className="capitalize">{day}</span>
              {isAvailable && (
                <>
                  <Controller
                    name={`${day}.startTime`}
                    control={control}
                    render={(field) => {
                      return (
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue placeholder="Start time" />
                          </SelectTrigger>
                          <SelectContent>
                            {timeSlots.map((time) => (
                              <SelectItem key={time} value={time}>
                                {time}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      );
                    }}
                  />
                  <span>to</span>
                  <Controller
                    name={`${day}.endTime`}
                    control={control}
                    // eslint-disable-next-line no-unused-vars
                    render={(field) => {
                      return (
                        <Select>
                          <SelectTrigger className="w-32">
                            <SelectValue placeholder="End time" />
                          </SelectTrigger>
                          <SelectContent>
                            {timeSlots.map((time) => (
                              <SelectItem key={time} value={time}>
                                {time}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      );
                    }}
                  />
                  {errors[day]?.endTime && (
                    <span className="text-red-500">
                      {errors[day]?.endTime?.message}
                    </span>
                  )}
                </>
              )}
            </div>
          );
        })}

        <div className="flex items-center space-x-4">
          <span className="w-48">Minimum gap between bookings (minutes): </span>
          <Input
            className="w-32"
            type="number"
            {...register("timeGap", { valueAsNumber: true })}
          />
          {errors?.timeGap && (
            <span className="text-red-500">{errors?.timeGap?.message}</span>
          )}
        </div>

        {error && <p className="text-red-500">{error?.message}</p>}

        <Button disabled={loading} className="mt-5" type="submit">
          {loading ? "Loading..." : "Update Availablility"}
        </Button>
      </form>
    </>
  );
};

export default AvailabilityForm;
