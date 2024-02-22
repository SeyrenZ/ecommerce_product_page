"use client";
import React, { useState, useEffect } from "react";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineClose,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
} from "react-icons/ai";

import Image from "next/image";
import { CartIcon } from "./svgs";
import { useCart } from "./context/CartContext";
import { fetchData } from "./utils/utils";

// Define the Product type
type ProductType = {
  name: string;
  price: number;
  image: string[];
  totalprice: number;
  quantity: number;
  discount: number;
};

const Product = () => {
  // Define state variables
  const [product, setProduct] = useState<ProductType | null>(null);
  const [selectedImage, setSelectedImage] = useState("");

  const [lightboxImage, setLightboxImage] = useState("");
  const [lightboxClicked, setLightboxClicked] = useState(false);
  const { addToCart } = useCart();

  // Fetch data
  useEffect(() => {
    const fetchAndSetData = async () => {
      const data = await fetchData();
      setProduct(data);
      setSelectedImage(data.image[0]);
    };

    fetchAndSetData();
  }, []);

  // handle quantity
  const incrementQuantity = () => {
    setProduct((prevProduct) => ({
      ...prevProduct!,
      quantity: (prevProduct?.quantity || 0) + 1,
    }));
  };

  const decrementQuantity = () => {
    if (product?.quantity && product.quantity > 1) {
      setProduct((prevProduct) => ({
        ...prevProduct!,
        quantity: (prevProduct?.quantity || 0) - 1,
      }));
    }
  };

  // handle image selection
  const handleSelectImage = (image: string) => {
    if (lightboxClicked) {
      setLightboxImage(image);
    } else {
      setSelectedImage(image);
    }
  };

  // handle lightbox
  const handleLightbox = () => {
    if (window.innerWidth > 640) {
      // 768px is typically the breakpoint for small screens
      setLightboxClicked(!lightboxClicked);
      if (!lightboxClicked) {
        setLightboxImage(selectedImage);
      }
    }
  };

  // handle image slider
  const nextImage = () => {
    const currentIndex = product?.image.indexOf(lightboxImage) as number;
    const nextIndex = (currentIndex + 1) % (product?.image.length ?? 0);
    setLightboxImage(product?.image[nextIndex]!);
  };

  const prevImage = () => {
    const currentIndex = product?.image.indexOf(lightboxImage) as number;
    const prevIndex =
      (currentIndex - 1 + (product?.image.length ?? 0)) %
      (product?.image.length ?? 0);
    setLightboxImage(product?.image[prevIndex]!);
  };

  const mobileNextImage = () => {
    const currentIndex = product?.image.indexOf(selectedImage) as number;
    const nextIndex = (currentIndex + 1) % (product?.image.length ?? 0);
    setSelectedImage(product?.image[nextIndex]!);
  };

  const mobilePrevImage = () => {
    const currentIndex = product?.image.indexOf(selectedImage) as number;
    const prevIndex =
      (currentIndex - 1 + (product?.image.length ?? 0)) %
      (product?.image.length ?? 0);
    setSelectedImage(product?.image[prevIndex]!);
  };

  return (
    <div className="w-full mx-auto max-w-[1280px] lg:py-24 py-20 sm:py-0 sm:pb-10 px-16 sm:px-0 flex flex-col xl:flex-row  items-center justify-between relative xl:gap-y-0 gap-y-10  ">
      {/* Image */}
      <div className="flex flex-col gap-y-8">
        <div className="flex items-center justify-center relative">
          <button
            className="bg-white left-5 rounded-full p-2 hidden absolute sm:block "
            onClick={mobilePrevImage}
          >
            <AiOutlineArrowLeft className="w-6 h-6" fill="#1d2025" />
          </button>
          <Image
            className="rounded-xl sm:rounded-none sm:h-[360px] object-cover"
            src={selectedImage}
            width={500}
            height={500}
            alt="photo of product"
            onClick={handleLightbox}
          ></Image>
          <button
            className="bg-white right-5 rounded-full p-2 absolute hidden sm:block "
            onClick={mobileNextImage}
          >
            <AiOutlineArrowRight className="w-6 h-6" fill="#1d2025" />
          </button>
        </div>

        <div className="flex justify-between sm:hidden ">
          {product?.image.map((image: any, index: number) => (
            <div
              key={index}
              className="rounded-xl border-transparent border-4 hover:border-orange-500 inline-block"
              onClick={() => handleSelectImage(image)} // Set selectedImage when the smaller image is clicked
            >
              <Image
                className="rounded-lg hover:opacity-50"
                src={image}
                width={100}
                height={100}
                alt="photo of product"
              ></Image>
            </div>
          ))}
        </div>
      </div>
      {/* show the lightbox when the product image is clicked */}
      {lightboxClicked ? (
        <>
          <div className="fixed inset-0 bg-black opacity-75 z-20"></div>
          <div className="flex flex-col items-center gap-y-8 absolute left-0 right-0 z-30">
            <div className="flex items-center justify-center relative z-0">
              <button
                className="bg-white mr-[-29px] rounded-full p-3 z-10"
                onClick={prevImage}
              >
                <AiOutlineArrowLeft className="w-8 h-8" fill="#1d2025" />
              </button>
              <div className="flex flex-col items-end  gap-y-4">
                <AiOutlineClose
                  className="w-8 h-8"
                  fill="white"
                  onClick={handleLightbox}
                />
                <Image
                  className="flex rounded-xl"
                  src={lightboxImage}
                  width={700}
                  height={700}
                  alt="photo of product"
                ></Image>
              </div>
              <button
                className="bg-white ml-[-29px] rounded-full p-3 z-10"
                onClick={nextImage}
              >
                <AiOutlineArrowRight className="w-8 h-8" fill="#1d2025" />
              </button>
            </div>

            <div className="flex gap-x-8">
              {product?.image.map((image: any, index: number) => (
                <div
                  key={index}
                  className="rounded-xl border-transparent border-4 hover:border-orange-500 inline-block"
                  onClick={() => handleSelectImage(image)} // Set selectedImage when the smaller image is clicked
                >
                  <Image
                    className="rounded-lg hover:opacity-50"
                    src={image}
                    width={110}
                    height={110}
                    alt="photo of product"
                  ></Image>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : null}

      {/* Description */}
      <div className="w-[500px] sm:w-[390px] sm:px-5 flex flex-col gap-y-10 sm:gap-y-4 relative z-0">
        <div className="flex flex-col gap-y-5 sm:gap-y-3">
          <div className="text-orange-500 font-semibold text-md sm:text-sm tracking-widest">
            SNEAKER COMPANY
          </div>
          <div className="text-5xl sm:text-3xl font-extrabold text-[#1d2025]">
            {product?.name}
          </div>
        </div>
        <div className="flex flex-col gap-y-8">
          <div className="text-[#68707d] text-lg sm:text-md">
            These low-profile sneakers are your perfect casual wear companion.
            Featuring a durable rubber outer sole, they’ll
            <br /> withstand everything the weather can offer.
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between gap-y-1.5">
            <div className="flex items-center gap-x-4">
              <div className="text-4xl sm:text-3xl font-extrabold text-[#1d2025]">
                $
                {(
                  (Number(product?.price) ?? 0) *
                  ((product?.discount || 0) / 100)
                ).toFixed(2)}
              </div>
              <div className="w-fit rounded-md bg-orange-500 bg-opacity-20 px-1.5 py-0.5">
                <div className="font-bold text-md text-orange-500">
                  {product?.discount}%
                </div>
              </div>
            </div>
            <div className="text-[#bebfc1] text-xl line-through">
              ${product?.price?.toFixed(2) ?? "0.00"}
            </div>
          </div>
        </div>
        <div className="sm:mt-3 flex sm:flex-col items-center justify-between sm:gap-y-5">
          <div className="w-44 sm:w-full px-3 py-4 rounded-lg bg-[#f7f8fd] flex items-center justify-between">
            <button
              className="text-2xl font-bold text-[#ff7d1a] "
              onClick={decrementQuantity}
            >
              <AiOutlineMinus />
            </button>
            <div className="text-lg font-bold text-[#1d2025]">
              {product?.quantity}
            </div>
            <button
              className="text-2xl font-extrabold text-[#ff7d1a]"
              onClick={incrementQuantity}
            >
              <AiOutlinePlus />
            </button>
          </div>
          <button
            className="w-[310px] sm:w-full p-4 rounded-lg bg-orange-500 hover:bg-orange-400 active:bg-orange-300 flex items-center justify-center shadow-xl shadow-orange-200"
            onClick={() => addToCart(product!)}
          >
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
