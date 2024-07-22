import WordRotate from "@/components/magicui/word-rotate";
import Header from "@/components/shared/Header";
import { BackgroundGradientAnimation } from "@/components/ui/BackgroundGradient";
import { rotateWords } from "@/constants";
import Image from "next/image";

export default function Home() {
  return (
    <div className="w-full h-[100vh] bg-[#111315]">
      <Header />
      <div className="w-full h-[100vh] flex flex-col items-center p-6 ">
        <BackgroundGradientAnimation
          containerClassName="w-full h-[80%] rounded-[48px] mt-16"
          gradientBackgroundEnd="#0E0E0E"
          className=""
          gradientBackgroundStart="#0E0E0E"
          interactive={false}
        >
          <div className="absolute z-10 inset-0 flex items-center justify-center text-white font-bold px-4 pointer-events-none text-2xl text-center md:text-4xl lg:text-7xl">
            <div className="w-full flex items-center justify-center ">
              <div className="flex items-start flex-col w-[75%] p-3 py-4 gap-2">
                <p>The all-in-one community</p>
                <div className="flex w-full place-items-baseline items-baseline gap-3">
                  <p className="">platform for</p>
                  <WordRotate
                    className="text-2xl text-center md:text-4xl lg:text-7xl font-bold"
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
    </div>
  );
}
