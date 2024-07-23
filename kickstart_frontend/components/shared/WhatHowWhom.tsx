import { what_how_who } from "@/constants";
import Image from "next/image";
import React from "react";

const WhatHowWhom = () => {
  return (
    <div className="w-full flex flex-col items-center justify-start mt-32 px-8 gap-5 hover:bg-black/50 rounded-[50px] transition-all ease-in-out duration-300 ">
      {what_how_who.map((item, index) => {
        if (index % 2 === 0) {
          return (
            <div
              key={index}
              className={`flex flex-col items-center justify-start bg-gradient-to-r from-[#${item.bg_from}] to-[#${item.bg_to}] gap-5 rounded-[48px] w-[80%] text-white`}
            >
              <Image
                src={item.image}
                alt={item.heading}
                width={500}
                height={200}
                className="rounded-[48px]"
              />
              <div className="flex flex-col p-4">
                <h1 className="font-bold text-[16px]">{item.heading}</h1>
                <p className="font-medium text-[12px] ">{item.description}</p>
              </div>
            </div>
          );
        } else {
          return (
            <div key={index} className="w-full flex flex-col items-center justify-start">
              <div
                className={`flex flex-col items-start justify-start  bg-gradient-to-r from-[#${item.bg_from}] to-[#${item.bg_to}] gap-5 rounded-[48px] w-[80%] text-white`}
              >
                <Image
                  src={item.image}
                  alt={item.heading}
                  width={500}
                  height={200}
                  className="rounded-[48px]"
                />
                <div className="flex flex-col p-4">
                  <h1 className="font-bold text-[16px]">{item.heading}</h1>
                  <p className="font-medium text-[12px] ">{item.description}</p>
                </div>
              </div>
            </div>
          );
        }
      })}
    </div>
  );
};

export default WhatHowWhom;
