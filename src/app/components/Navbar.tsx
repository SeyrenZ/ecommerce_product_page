// Import necessary dependencies
"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { CartIcon, DeleteIcon } from "./svgs";
import Image from "next/image";
import { useCart } from "./context/CartContext";

// Define the Navbar component
const Navbar = () => {
  // Define the Link type
  type Link = {
    name: string;
    url: string;
  };

  // Define an array of links
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

  // Define state variables
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cart, remChart } = useCart();
  const menuRef = useRef<HTMLDivElement | null>(null);

  // Toggle the menu
  const toggleMenu = (e: any) => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Check if the cart is empty
  const isCartEmpty = cart.length === 0;

  // Handle menu click
  const handleMenuClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  // Add event listener to close the menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Render the Navbar component
  return (
    <div className="w-full mx-auto max-w-[1280px] pt-8 pb-10 flex justify-between items-center border-b-[1px]">
      <div className="flex items-center gap-x-12">
        <div className="text-3xl font-extrabold text-[#1d2025]">sneakers</div>
        <div className="flex gap-x-8">
          {/* Render the links */}
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
          {/* Render the CartIcon */}
          <div className="flex relative">
            <CartIcon />
            {/* Show the number of items in the cart */}
            {isCartEmpty ? null : (
              <div className="ml-3 mt-[-5px] w-fit px-2 absolute bg-orange-500 rounded-md text-[10px] text-white flex items-center justify-center">
                {cart.length}
              </div>
            )}
          </div>

          {isMenuOpen && (
            <div
              ref={menuRef}
              className="w-[400px] max-h-[400px] absolute top-14 right-[-185px] rounded-lg bg-white shadow-2xl flex flex-col "
              onClick={handleMenuClick}
            >
              {/* Render the menu content */}
              <div className="px-5 py-5 text-lg font-bold text-[#1d2025] border-b-2">
                Cart
              </div>
              <div className="p-5 flex flex-col gap-y-5 overflow-scroll overflow-x-hidden ">
                {/* Render the cart items */}
                {isCartEmpty ? (
                  <div className="py-32 text-[#68707d] text-lg font-bold flex justify-center items-center">
                    Your cart is empty.
                  </div>
                ) : (
                  <div>
                    <div className="flex flex-col gap-y-4 ">
                      {cart.map((product, index) => (
                        <div
                          className="flex items-center justify-around gap-x-4  "
                          key={index}
                        >
                          {/* Render the product image */}
                          <Image
                            className="rounded-md"
                            src={product.image}
                            width={50}
                            height={50}
                            alt={product.name}
                          />
                          <div className="flex flex-col">
                            {/* Render the product name, price, and quantity */}
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
                          {/* Render the DeleteIcon */}
                          <div onClick={() => remChart(index)}>
                            <DeleteIcon />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              {/* Render the checkout button */}
              {isCartEmpty ? null : (
                <div className="p-5 flex items-center justify-center">
                  <button className="w-full p-4 rounded-lg bg-orange-500 hover:bg-orange-400 active:bg-orange-300 flex items-center justify-center">
                    <div className="flex items-center gap-x-4 text-white text-lg font-medium">
                      Checkout
                    </div>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="rounded-full border-transparent border-[3px] hover:border-orange-500 hover:cursor-pointer">
          {/* Render the profile image */}
          <Image
            className="select-none"
            src="/image-avatar.png"
            width={50}
            height={50}
            alt="profile"
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
