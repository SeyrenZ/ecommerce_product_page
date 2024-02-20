"use client";
import React, { useState, useEffect } from "react";
import { AiOutlineMinus, AiOutlinePlus, AiOutlineClose } from "react-icons/ai";
import Image from "next/image";
import { CartIcon } from "./svgs";
import { useCart } from "./context/CartContext";
import { fetchData } from "./utils/utils";

type ProductType = {
  name: string;
  price: number;
  image: string[];
  totalprice: number;
  quantity: number;
};

const Product = () => {
  const [product, setProduct] = useState<ProductType | null>(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [lightboxImage, setLightboxImage] = useState("");
  const [lightboxClicked, setLightboxClicked] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchAndSetData = async () => {
      const data = await fetchData();
      setProduct(data);
      setSelectedImage(data.image[0]);
    };

    fetchAndSetData();
  }, []);

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

  const handleSelectImage = (image: string) => {
    if (lightboxClicked) {
      setLightboxImage(image);
    } else {
      setSelectedImage(image);
    }
  };

  const handleLightbox = () => {
    setLightboxClicked(!lightboxClicked);
    if (!lightboxClicked) {
      setLightboxImage(selectedImage);
    }
  };

  return (
    <div className="w-full mx-auto max-w-[1280px] py-24 px-16 flex items-center justify-between relative  ">
      {/* Image */}

      <div className="flex flex-col gap-y-8">
        <Image
          className="rounded-xl"
          src={selectedImage}
          width={500}
          height={500}
          alt="photo of product"
          onClick={handleLightbox}
        ></Image>
        <div className="flex justify-between">
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
            <div className="flex flex-col first:items-end gap-y-4">
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

            <div className="flex gap-x-5">
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
      <div className="w-[500px] flex flex-col gap-y-10 relative z-0">
        <div className="flex flex-col gap-y-5">
          <div className="text-orange-500 font-semibold text-md tracking-widest">
            SNEAKER COMPANY
          </div>
          <div className="text-5xl font-extrabold text-[#1d2025]">
            {product?.name}
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
                ${product?.price.toFixed(2)}
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
            className="w-[310px] p-4 rounded-lg bg-orange-500 hover:bg-orange-400 active:bg-orange-300 flex items-center justify-center shadow-xl shadow-orange-200"
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
