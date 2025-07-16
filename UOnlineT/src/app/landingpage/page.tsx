import { Metadata } from "next";
import React from "react";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Next.js Chart | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Chart page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

const BasicChartPage: React.FC = () => {
  function setDropdownOpen(arg0: boolean): void {
    throw new Error("Function not implemented.");
  }

  return (

      <span className="h-12 w-12 rounded-full">
        <Image
          width={500}
          height={500}
          src={"/images/product/1.jpg"}
          style={{
            width: "auto",
            height: "auto",
          }}
          alt="User"
        />
      </span>

  );
};

export default BasicChartPage;
