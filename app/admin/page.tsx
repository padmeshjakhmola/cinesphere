"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import NavBar from "@/components/NavBar";
import { Button } from "@/components/ui/button";
import s3 from "@/utils/aws";
import config from "@/lib/config";

const Page: React.FC = () => {
  const [poster, setPoster] = useState<File | null>(null);
  const [video, setVideo] = useState<File | null>(null);

  const fileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];

    console.log("File:", file);

    if (e.target.id === "picture") {
      setPoster(file);
      console.log("Picture:", file);
    } else if (e.target.id === "video") {
      setVideo(file);
      console.log("Video:", file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!poster || !video) {
      alert("Please upload both a poster and a video.");
      return;
    }

    const formData = new FormData();
    formData.append("image", poster);
    formData.append("video", video);

    const response = await fetch("/api/s3-upload", {
      method: "POST",
      body: formData,
    });
    
    const result = await response.json();
    console.log("result:", result);
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen">
        <h1 className="py-4">Upload File</h1>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="picture">Poster</Label>
          <Input
            id="picture"
            type="file"
            onChange={fileSelect}
            accept="image/*"
          />
        </div>
        <h1 className="py-4 pt-6">Upload Video</h1>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="picture">Video</Label>
          <Input
            id="video"
            type="file"
            onChange={fileSelect}
            accept="video/*"
          />
        </div>
        <Button className="flex mt-8" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </>
  );
};

export default Page;
