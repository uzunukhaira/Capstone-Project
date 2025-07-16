"use client";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import Image from "next/image";

const ECommerce: React.FC = () => {

  return (
    <>
      {/* Header grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <h2 className="text-2xl font-bold mb-4 col-span-1 md:col-span-2 xl:col-span-4">
          Dashboard
        </h2>
      </div>

      {/* Main content grid */}
      {/* <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <div className="col-span-12 xl:col-span-12">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {productImages.map((src, index) => (
              <div
                key={index}
                className="border rounded-lg shadow-md overflow-hidden bg-white"
              > */}
                {/* Gambar */}
                {/* <Image
                  src={src}
                  alt={`Product ${index + 1}`}
                  width={300}
                  height={300}
                  className="object-cover w-full h-48"
                /> */}
                {/* Detail */}
                {/* <div className="text-center p-4">
                  <h3 className="text-lg font-semibold text-gray-700">
                   {index + 1}
                  </h3>
                  <button className="mt-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                    Detail
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div> */}
    </>
  );
};

export default ECommerce;
