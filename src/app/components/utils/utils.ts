import React from "react";

export const fetchData = async () => {
  try {
    const res = await fetch("/data/productData.json");
    const data = await res.json();
    return { ...data, quantity: 1 }; // Set initial quantity to 1
  } catch (error) {
    console.log(error);
  }
};
