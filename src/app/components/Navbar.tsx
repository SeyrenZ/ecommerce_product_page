"use client";
import React, { useState } from "react";
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

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="w-full mx-auto max-w-[1280px] pt-8 pb-10 flex justify-between items-center border-b-[1px]">
      <div className="flex items-center gap-x-12">
        <div className="text-3xl font-extrabold text-[#1d2025]">sneakers</div>
        <div className="flex gap-x-8">
          {links.map((link, index) => (
            <Link
              key={index}
              href={link.url}
              className="text-sm text-[#68707d] font-medium hover:text-orange-500"
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
      <div className="flex gap-x-10 items-center">
        <div className="relative" onClick={toggleMenu}>
          <CartIcon />
          {isMenuOpen && (
            <div className="w-[400px] h-[290px] absolute top-14 right-[-185px] rounded-lg bg-white shadow-2xl flex flex-col">
              {/* Menu content */}
              <div className="px-5 py-5 text-lg font-bold text-[#1d2025] border-b-2">
                Cart
              </div>
              <div className="flex justify-center items-center flex-grow">
                <div className="text-md font-bold text-[#68707d]">
                  Your cart is empty.
                </div>
              </div>
            </div>
          )}
        </div>
        <div
          className="rounded-full border-transparent border-[3px] hover:border-orange-500 hover:cursor-pointer"
          onClick={toggleMenu}
        >
          <Image src="/image-avatar.png" width={50} height={50} alt="profile" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
