import React from "react";
import Image from "next/image";
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

  return (
    <div className="w-full mx-auto max-w-[1440px] p-20 flex items-center justify-between ">
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
            <Image
              key={index}
              className="rounded-xl"
              src={image.src}
              width={100}
              height={100}
              alt={image.alt}
            ></Image>
          ))}
        </div>
      </div>
      {/* Description */}
      <div className="w-[500px] flex flex-col gap-y-8">
        <div className="text-3xl font-extrabold text-[#1d2025]">
          Fall Limited Edition Sneakers
        </div>
        <div className="text-[#68707d] text-lg">
          These low-profile sneakers are your perfect casual wear companion.
          Featuring a durable rubber outer sole, they’ll withstand everything
          the weather can offer.
        </div>
        <div className="flex items-center gap-x-4">
          <div className="text-3xl font-extrabold text-[#1d2025]">$125.00</div>
          <div className="text-[#68707d] text-lg line-through">$250.00</div>
        </div>
        <div className="flex gap-x-4">
          <button className="bg-[#ff3e00] text-white text-lg py-4 px-8 rounded-lg">
            Add to cart
          </button>
          <button className="text-[#ff3e00] text-lg py-4 px-8 rounded-lg border-[1px] border-[#ff3e00]">
            Buy now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
