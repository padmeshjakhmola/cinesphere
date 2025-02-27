import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import NavBar from "@/components/NavBar";

const Page = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen">
        <h1 className="py-4">Upload File</h1>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="picture">Poster</Label>
          <Input id="picture" type="file" />
        </div>
        <h1 className="py-4 pt-6">Upload Video</h1>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="picture">Video</Label>
          <Input id="video" type="file" />
        </div>
      </div>
    </>
  );
};

export default Page;
