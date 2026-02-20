import Image from "next/image";
import Link from "next/link";

export default function BrandLogo({ size }) {
  return (
    <Link href={"/"} className="flex items-center w-max">
      <figure className={`relative ${size === "small" ? "size-8" : "size-12"}`}>
        <Image src={"/logo.png"} alt="logo" fill />
      </figure>
      <p
        className={`font-bold  ${size === "small" ? "text-base" : "text-2xl"} mt-4 ms-1`}
      >
        ai
      </p>
    </Link>
  );
}
