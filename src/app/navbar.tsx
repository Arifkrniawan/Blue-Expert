"use client";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="flex relative h-[8.28dvh] bg-[#0D100D] w-dvw">
      <div className="h-[8.28dvh] w-dvw mx-[6.25rem] my-auto flex justify-between">
        <div className="py-[24px] gap-[8px] flex items-center">
          <a className="text-white p-[24px]">Work & Project</a>
        </div>
        <div className="py-[24px] gap-[8px] flex items-center">
          <a className="text-white p-[24px]">Services</a>
        </div>
        <Image
          src="/logosemut.svg"
          alt="Vercel Logo"
          width={30.38}
          height={40}
          priority
        />
        <div className="py-[24px] gap-[8px] flex items-center">
          <a className="text-white p-[24px]">Team</a>
        </div>
        <button className="button gap-[8px] w-[9.5625rem] h-12 flex items-center self-center">
          <a className="text-white p-[24px]">Get Contact</a>
        </button>
      </div>
    </nav>
  );
}
