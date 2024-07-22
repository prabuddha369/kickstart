import WordRotate from "@/components/magicui/word-rotate";
import Header from "@/components/shared/Header";
import { BackgroundGradientAnimation } from "@/components/ui/BackgroundGradient";
import { rotateWords } from "@/constants";
import Image from "next/image";

export default function Home() {
  return (
    <div className="w-full flex flex-col gap-6 bg-[#111315] items-center px-6 pb-6">
      <Header />
      <div className="w-full h-[80vh] mb-10">
        <BackgroundGradientAnimation
          containerClassName="w-full h-[100%] rounded-[48px] mt-16 px-5 mb-20"
          gradientBackgroundEnd="#0E0E0E"
          className=""
          gradientBackgroundStart="#0E0E0E"
          interactive={false}
        >
          <div className="absolute z-10 inset-0 flex items-center justify-center text-white font-bold px-4 pointer-events-none text-2xl text-center md:text-4xl lg:text-5xl">
            <div className="w-[90%] flex items-start justify-between ">
              <div className="flex items-start flex-col w-[60%] py-4 gap-2">
                <p>The all-in-one community</p>
                <div className="flex w-full place-items-baseline items-baseline gap-3">
                  <p className="">platform for</p>
                  <WordRotate
                    className="text-2xl text-center md:text-4xl lg:text-5xl font-bold"
                    words={rotateWords}
                  />
                </div>
              </div>
              <Image
                src="/logo_image.svg"
                width={180}
                height={200}
                alt="Kickstart logo"
              />
            </div>
          </div>
        </BackgroundGradientAnimation>
      </div>
      <div className="absolute top-[80%] border-4 border-[#111315] w-[30%]  rounded-full mt-10 bg-white">
        <div className="relative min-w-full flex items-center justify-between ps-2">
          <input
            type="text"
            placeholder="Enter your email"
            className="px-2 w-[67%] py-[2px] border-transparent focus:border-transparent focus:ring-0 focus:outline-none"
          />
          <button className=" right-[20%] p-3 text-white  rounded-full bg-gradient-to-r from-[#DC3838] to-[#3E4DD2] ">
            Sign up for Kickstart
          </button>
        </div>
      </div>
    </div>
  );
}
