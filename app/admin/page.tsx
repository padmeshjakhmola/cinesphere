"use client";

import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import NavBar from "@/components/NavBar";
import s3 from "@/utils/aws";
import config from "@/lib/config";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  name: z.string().min(1).max(50),
  year: z.string().min(1).max(50),
  image: z.instanceof(File, { message: "Image file is required" }),
  video: z.instanceof(File, { message: "Video file is required" }),
});

const Page: React.FC = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      year: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // console.log("rrrrrrrrrrrrrrrr", values);

    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("year", values.year);
    formData.append("image", values.image);
    formData.append("video", values.video);

    try {
      const response = await fetch("/api/s3-upload", {
        method: "POST",
        body: formData,
      });

      // const result = await response.json();
      // console.log("Upload result:", result);
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  }

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <div className="w-[500px] max-w-md p-6 rounded-lg shadow-lg">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Movie Name"
                        {...field}
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="year"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Year</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Release Year"
                        {...field}
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Poster</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept="image/*"
                        className="w-full"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            form.setValue("image", file);
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="video"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Video</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept="video/*"
                        className="w-full"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            form.setValue("video", file);
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Submit
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Page;
