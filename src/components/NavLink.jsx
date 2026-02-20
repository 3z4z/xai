"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink({ to, activeClass, children, className }) {
  const pathName = usePathname();

  const isActive = to === "/" ? pathName === "/" : pathName.startsWith(to);

  return (
    <Link
      href={to}
      className={`transition-all ${className?.trim() || ""} ${
        isActive ? activeClass?.trim() : ""
      }`}
    >
      {children}
    </Link>
  );
}
