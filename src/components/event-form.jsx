import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { eventSchema } from "@/app/validators/validator";
import { Input } from "./ui/input";
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "./ui/button";



const EventForm = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(eventSchema),
    defaultValues: { duration: 30, isPrivate: true },
  });
  return (
    <>
      <form>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium " >
            Event Title
          </label>
          <Input id='title' placeholder='Title' type='text' {...register("title")} className='mt-1' />

          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium " >
            Event Description
          </label>
          <Textarea id='description' placeholder='Description' type='text' {...register("description")} className='mt-1' />

          {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="duration" className="block text-sm font-medium " >
            Duration (minutes)
          </label>
          <Input id='duration' placeholder='Duration' {...register("duration", { valueAsNumber: true })} className='mt-1' type='number' />

          {errors.duration && <p className="text-red-500 text-sm mt-1">{errors.duration.message}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="isPrivate" className="block text-sm font-medium " >
            Event Privacy
          </label>

          <Controller name='isPrivate' control={control}
            render={(field) => {
              <Select value={field.value ? "true" : "false"}
                onValueChange={(value) => field.onChange(value === 'true')}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Privacy" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="true">Private</SelectItem>
                  <SelectItem value="false">Public</SelectItem>
                </SelectContent>
              </Select>
            }}
          />
          {errors.isPrivate && <p className="text-red-500 text-sm mt-1">{errors.isPrivate.message}</p>}
        </div>

        <Button className='w-full' type='submit'>Submit</Button>

      </form>

    </>
  );
};

export default EventForm;
