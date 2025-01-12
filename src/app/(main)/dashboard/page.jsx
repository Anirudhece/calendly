"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import React, { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { usernameSchema } from "@/app/validators/validator";
import { zodResolver } from "@hookform/resolvers/zod";

const DashBoard = () => {
  /** Clerk User */
  const { user, isLoaded } = useUser();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(usernameSchema),
  });

  const onSubmit = async (data) => {
    console.log("data:", data);
    console.log("data2:", data);
  };

  useEffect(() => {
    setValue("username", user?.username); // remeber to swap username with username
  }, [isLoaded, user, setValue]);

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>
            Welcome,{" "}
            <span className="decoration-1 decoration-wavy text-sky-500 font-bold text-xl">
              {" "}
              {user?.firstName}{" "}
            </span>
          </CardTitle>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Your unique Link</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex gap-2 items-center">
              {window?.location?.origin}
              <Input {...register("username")} placeholder="username" />
            </div>

            {errors?.username && (
              <p className="text-red-500 text-sm">
                {errors?.username?.message}
              </p>
            )}

            <Button type="submit" size="sm">
              Update Username
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashBoard;
