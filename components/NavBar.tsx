import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import Link from "next/link";

const allHeadings: Heading[] = [
  { text: "Home", link: "/" },
  { text: "Series", link: "/series" },
  { text: "Movies", link: "/movies" },
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
            <Link href={heading.link}>
              <li key={key} className="cursor-pointer">
                {heading.text}
              </li>
            </Link>
          );
        })}
      </ul>
      <Button variant="secondary" className="flex justify-center items-center">
        Submit movie request?
        <Image
          src="/icons/external.svg"
          width={18}
          height={18}
          alt="external_link"
        />
      </Button>
    </header>
  );
};

export default NavBar;
