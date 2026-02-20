"use client";

import Link from "next/link";
import Image from "next/image";
import Button from "../shared/Button";
import { LucideStars } from "lucide-react";

export default function HeaderComponent() {
  return (
    <>
      <header className="flex w-full justify-between py-4 px-3 fixed left-0 top-0 bg-transparent z-1">
        <div className="w-1/4">
          <Link href={"/"} className="flex items-center w-max">
            <figure className="relative size-12">
              <Image src={"/logo.png"} alt="logo" fill />
            </figure>
            <p className="font-bold text-2xl mt-4 ms-1">ai</p>
          </Link>
        </div>
        {/* <NavbarComponent /> */}
        <div className="w-1/4 flex items-center justify-end">
          <Button>
            <LucideStars className="size-4.5" />
            <span>Start Tour</span>
          </Button>
        </div>
      </header>
    </>
  );
}
