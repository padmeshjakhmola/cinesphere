import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import MovieForm from "./MovieForm";

const allHeadings: Heading[] = [
  { text: "Home", link: "/" },
  { text: "Series", link: "/series" },
  { text: "Movies", link: "/movie" },
  ...(process.env.NODE_ENV === "development"
    ? [{ text: "Admin", link: "/admin" }]
    : []),
];

const NavBar = () => {
  return (
    <header className="mx-6 flex items-center justify-between gap-5">
      <Link href="/">
        <Image
          src="/images/logo.png"
          width={80}
          height={80}
          alt="logo"
          priority
        />
      </Link>
      <ul className="flex flex-row items-center justify-center gap-10 font-geist-mono text-lg font-semibold">
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
          <h1 className="flex items-center justify-center gap-2 hover:underline">
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
              Submit the details of the movie you wan{`&apost`}t to see next !!
            </DialogDescription>
            <MovieForm />
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </header>
  );
};

export default NavBar;
