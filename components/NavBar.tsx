import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import MovieForm from "./MovieForm";

const allHeadings: Heading[] = [
  { text: "Home", link: "/" },
  { text: "Series", link: "/series" },
  { text: "Movies", link: "/movie" },
];

const NavBar = () => {
  return (
    <header className="flex mx-6 gap-5 items-center justify-between">
      <Link href="/">
        <Image
          src="/images/logo.png"
          width={80}
          height={80}
          alt="logo"
          priority
        />
      </Link>
      <ul className="flex flex-row gap-10 items-center justify-center font-semibold text-lg font-geist-mono">
        {allHeadings.map((heading, key) => {
          return (
            <li key={key} className="cursor-pointer hover:underline">
              <Link href={heading.link}>{heading.text}</Link>
            </li>
          );
        })}
      </ul>
      <Dialog>
        <DialogTrigger>
          <h1 className="flex justify-center items-center gap-2 hover:underline">
            Submit movie request?
            <Image
              src="/icons/external.svg"
              width={18}
              height={18}
              alt="external_link"
            />
          </h1>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Submit the details</DialogTitle>
            <DialogDescription className="pb-2">
              Submit the details of the movie you wan't to see next !!
            </DialogDescription>
            <MovieForm />
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </header>
  );
};

export default NavBar;
