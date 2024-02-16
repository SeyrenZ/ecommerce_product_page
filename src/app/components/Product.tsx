"use client";
import React, { useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import Image from "next/image";
import { CartIcon } from "./svgs";
import { useContext } from "react";

const Product = () => {
  type Image = {
    src: string;
    alt: string;
  };

  const images: Image[] = [
    {
      src: "/image-product-1.jpg",
      alt: "product",
    },
    {
      src: "/image-product-2.jpg",
      alt: "product",
    },
    {
      src: "/image-product-3.jpg",
      alt: "product",
    },
    {
      src: "/image-product-4.jpg",
      alt: "product",
    },
  ];

  const [quantity, setQuantity] = useState(0); // Set default value to 0

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 0) {
      // Update condition to check if quantity is greater than 0
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="w-full mx-auto max-w-[1280px] py-24 px-16 flex items-center justify-between ">
      {/* Image */}
      <div className="flex flex-col gap-y-8">
        <Image
          className="rounded-xl"
          src="/image-product-1.jpg"
          width={500}
          height={500}
          alt="photo of product"
        ></Image>
        <div className="flex justify-between">
          {images.map((image, index) => (
            <div
              key={index}
              className="rounded-xl border-transparent border-4 hover:border-orange-500 inline-block"
            >
              <Image
                className="rounded-lg hover:opacity-50"
                src={image.src}
                width={100}
                height={100}
                alt={image.alt}
              ></Image>
            </div>
          ))}
        </div>
      </div>
      {/* Description */}
      <div className="w-[500px] flex flex-col gap-y-10">
        <div className="flex flex-col gap-y-5">
          <div className="text-orange-500 font-semibold text-md tracking-widest">
            SNEAKER COMPANY
          </div>
          <div className="text-5xl font-extrabold text-[#1d2025]">
            Fall Limited Edition Sneakers
          </div>
        </div>
        <div className="flex flex-col gap-y-8">
          <div className="text-[#68707d] text-lg">
            These low-profile sneakers are your perfect casual wear companion.
            Featuring a durable rubber outer sole, they’ll
            <br /> withstand everything the weather can offer.
          </div>
          <div className="flex flex-col items-start gap-y-1.5">
            <div className="flex items-center gap-x-4">
              <div className="text-4xl font-extrabold text-[#1d2025]">
                $125.00
              </div>
              <div className="w-fit rounded-md bg-orange-500 bg-opacity-20 px-1.5 py-0.5">
                <div className="font-bold text-md text-orange-500">50%</div>
              </div>
            </div>
            <div className="text-[#bebfc1] text-xl line-through">$250.00</div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="w-44 px-3 py-4 rounded-lg bg-[#f7f8fd] flex items-center justify-between">
            <button
              className="text-2xl font-bold text-[#ff7d1a] "
              onClick={decrementQuantity}
            >
              <AiOutlineMinus />
            </button>
            <div className="text-lg font-bold text-[#1d2025]">{quantity}</div>
            <button
              className="text-2xl font-extrabold text-[#ff7d1a]"
              onClick={incrementQuantity}
            >
              <AiOutlinePlus />
            </button>
          </div>
          <button className="w-[310px] p-4 rounded-lg bg-orange-500 hover:bg-orange-400 flex items-center justify-center shadow-xl shadow-orange-200">
            <div className="flex items-center gap-x-4 text-white text-lg font-medium">
              <CartIcon /> Add to cart
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
