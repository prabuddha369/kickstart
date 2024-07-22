import { BackgroundGradientAnimation } from "@/components/ui/BackgroundGradient";
import Image from "next/image";

export default function Home() {
  return (
    <div className="w-full h-screen flex flex-col items-center p-6 bg-[#111315]">
      <BackgroundGradientAnimation containerClassName="w-full h-screen rounded-[48px]">
        <div className="absolute z-50 inset-0 flex items-center justify-center text-white font-bold px-4 pointer-events-none text-3xl text-center md:text-4xl lg:text-7xl">
          <p className="bg-clip-text text-transparent drop-shadow-2xl bg-gradient-to-b from-white/80 to-white/20">
            Gradients X Animations
          </p>
        </div>
      </BackgroundGradientAnimation>
    </div>
  );
}
