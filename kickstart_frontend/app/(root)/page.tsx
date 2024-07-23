import WordRotate from "@/components/magicui/word-rotate";
import Features from "@/components/shared/Features";
import Header from "@/components/shared/Header";
import WhatHowWhom from "@/components/shared/WhatHowWhom";
import { BackgroundGradientAnimation } from "@/components/ui/BackgroundGradient";
import { rotateWords } from "@/constants";
import Image from "next/image";

export default function Home() {
  return (
    <div className="w-full flex flex-col gap-10 bg-[#111315] items-center px-6 pb-6">
      <Header />
      <div className="w-full h-[80vh] mb-10">
        <BackgroundGradientAnimation
          containerClassName="w-full h-[100%] rounded-[48px] mt-16 px-5 mb-20"
          gradientBackgroundEnd="#0E0E0E"
          className=""
          gradientBackgroundStart="#0E0E0E"
          interactive={false}
        >
          <div className="absolute z-10 inset-0 flex items-center justify-center text-white font-bold px-4 pointer-events-none text-2xl text-center md:text-4xl lg:text-[64px]">
            <div className="w-[90%] flex flex-col items-center justify-center gap-32 ">
              <div className="flex items-center flex-col w-[90%] py-4 ">
                <p>The all-in-one community</p>
                <div className="flex flex-col w-full place-items-baseline items-center">
                  <p className="">platform for</p>
                  <WordRotate
                    className="text-2xl text-center md:text-4xl lg:text-[64px] font-bold"
                    words={rotateWords}
                  />
                </div>
              </div>
              <Image
                src="/logo_image.svg"
                width={200}
                height={200}
                alt="Kickstart logo"
              />
            </div>
          </div>
        </BackgroundGradientAnimation>
      </div>
      <div className="absolute top-[83%] border-8  border-[#111315] w-[80%] rounded-full mt-10 bg-white">
        <div className="relative min-w-full flex items-center justify-between ps-2">
          <input
            type="text"
            placeholder="Enter your email"
            className="px-2 w-[65%] py-[1px] border-transparent focus:border-transparent focus:ring-0 focus:outline-none text-[16px] bg-white"
          />
          <button className=" right-[20%] py-3 px-2 text-white  rounded-full bg-gradient-to-r to-[#DC3838] from-[#3E4DD2] text-[10px] focus:border-transparent focus:ring-0 focus:outline-none font-semibold">
            Sign up for Kickstart
          </button>
        </div>
      </div>

      <WhatHowWhom />

      <Features />
    </div>
  );
}
