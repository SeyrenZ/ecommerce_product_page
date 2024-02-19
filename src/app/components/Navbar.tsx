"use client";
import React, { useState } from "react";
import Link from "next/link";
import { CartIcon } from "./svgs";
import Image from "next/image";
import { useCart } from "./context/CartContext";
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
  const { cart } = useCart();

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
            <div className="w-[400px] h-auto absolute top-14 right-[-185px] rounded-lg bg-white shadow-2xl flex flex-col overflow-hidden">
              {/* Menu content */}
              <div className="px-5 py-5 text-lg font-bold text-[#1d2025] border-b-2">
                Cart
              </div>
              <div className="p-5 flex flex-col gap-y-5 ">
                {cart.map((product, index) => (
                  <div className="flex gap-x-4" key={index}>
                    <Image
                      className="rounded-md"
                      src={product.image}
                      width={50}
                      height={50}
                      alt={product.name}
                    />
                    <div className="flex flex-col">
                      <div className="text-[#68707d] text-md font-medium">
                        {product.name}
                      </div>
                      <div className="text-[#68707d] text-md">
                        ${product.price.toFixed(2)} x {product.quantity}{" "}
                        <span className="text-[#1d2025] font-extrabold text-md">
                          ${product.totalprice.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
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
