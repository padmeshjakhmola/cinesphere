"use client";

import React, { useState } from "react";

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
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  name: z.string().min(1).max(50),
  year: z.string().min(1).max(50),
  image: z.instanceof(File, { message: "Image file is required" }),
  video: z.instanceof(File, { message: "Video file is required" }),
});

const Page: React.FC = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
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
      setIsLoading(true);
      const response = await fetch("/api/s3-upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      console.log("Upload result:", result);
      toast.success("Movie Uploded");
      router.replace("/");
    } catch (error) {
      console.error("Error uploading files:", error);

      // ...
      toast.error("Failed to upload please check console");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <div className="flex h-screen items-center justify-center">
        <div className="w-[500px] max-w-md rounded-lg p-6 shadow-lg">
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
                render={() => (
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
                render={() => (
                  <FormItem>
                    <FormLabel>Video</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept="file/*"
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
              {isLoading ? (
                <Button type="submit" className="w-full" disabled>
                  Uploding
                  <AiOutlineLoading3Quarters className="animate-spin" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="w-full"
                  onClick={() => toast.info("Uploading....")}
                >
                  Submit
                </Button>
              )}
            </form>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Page;
