import React from "react";
import Link from "next/link";
import { CartIcon } from "./svgs";
import Image from "next/image";
const Navbar = () => {
  type Link = {
    name: string;
    url: string;
  };

  const links: Link[] = [
    {
      name: "Collections",
      url: "/",
    },
    {
      name: "Men",
      url: "/",
    },
    {
      name: "Woman",
      url: "/",
    },
    {
      name: "About",
      url: "/",
    },
    {
      name: "Contact",
      url: "/",
    },
  ];

  return (
    <div className="w-full mx-auto max-w-[1440px] pt-8 pb-10 flex justify-between items-center border-b-[1px]">
      <div className="flex gap-x-12">
        <div className="text-3xl font-extrabold text-[#1d2025]">sneakers</div>
        <div className="flex items-center gap-x-8">
          {links.map((link, index) => (
            <Link
              key={index}
              href={link.url}
              className="text-sm text-[#68707d] font-medium"
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
      <div className="flex gap-x-10 items-center">
        <CartIcon />
        <Image src="/image-avatar.png" width={50} height={50} alt="profile" />
      </div>
    </div>
  );
};

export default Navbar;
