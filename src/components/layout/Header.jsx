"use client";

import Button from "../shared/Button";
import { LucideStars } from "lucide-react";
import BrandLogo from "../shared/BrandLogo";
import { useEffect, useState } from "react";

export default function HeaderComponent() {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 1600) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <>
      <header
        className={`${isScrolled ? "bg-primary/3 rounded-2xl shadow-lg backdrop-blur-[6.2px] border-b-primary/25" : "border-b-transparent"} border-b transition-all flex w-full justify-between py-4 px-3 fixed left-0 top-0 bg-transparent z-999`}
      >
        <BrandLogo />
        <Button>
          <LucideStars className="size-4.5" />
          <span>Start Tour</span>
        </Button>
      </header>
    </>
  );
}
