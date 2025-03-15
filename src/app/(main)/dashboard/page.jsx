"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import React, { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { usernameSchema } from "@/app/validators/validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateUsername } from "@/actions/users";
import useFetch from "@/hooks/use-fetch";

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

  const { loading, error, fn: fnUpdateUsername } = useFetch(updateUsername);

  const onSubmit = async (data) => {
    fnUpdateUsername(data?.username);
  };

  useEffect(() => {
    setValue("username", user?.username);
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
            <div className="flex gap-2 items-center break-all">
              {window?.location?.origin}
              <Input {...register("username")} placeholder="username" />
            </div>

            {errors?.username && (
              <p className="text-red-500 text-sm mt-1">
                {errors?.username?.message}
              </p>
            )}
            {error && <p className="text-red-500 text-sm mt-1">
              {error?.message}
            </p>}
            {loading && <p>Updating...</p>}

            <Button type="submit" size="sm">Update Username</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashBoard;
