"use client";
// import useScrollAnimationStore from "../state/ScrollStore";
import Image from "next/image";
import { useEffect, useRef } from "react";
import React from "react";

export default function Home() {
  const triggerRef = useRef<HTMLDivElement>(null);
  // const setTriggerRef = useScrollAnimationStore((state)=> state.setTriggerRef)

  useEffect(() => {
    let currentSlide = 0;
    const slides = document.querySelectorAll(".item-slider img");
    const totalSlides = slides.length - 1;

    function showNextSlide() {
      if (currentSlide < totalSlides) {
        slides[currentSlide].classList.remove("active");
        slides[currentSlide].classList.add("move-down");

        currentSlide = (currentSlide + 1) % slides.length;

        slides[currentSlide].classList.add("active");

        setTimeout(() => {
          slides[currentSlide].classList.remove("move-down");
        }, 1000);
      }
    }
    setInterval(showNextSlide, 3000);
  }, []);

  return (
    <main className="relative flex flex-col bg-inherit">
      <section className="grid grid-row-2 h-screen bg-white z-10">
        <div className="row-start-1 row-end-1 flex flex-col justify-center items-center m-auto mt-0 col-start-1">
          <p className="text-center text-blue-500 mt-20 text-base">Feature</p>
          <h2 className="text-center text-[3.5rem] font-bold font-lota mb-5">
            Elevate With Our Features!
          </h2>
          <p className="text-center font-manropeRegular text-[1.169rem] text-gray-600 w-[48rem] m-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
        <div className="flex row-start-1 row-end-2 mt-[22.75rem] justify-center gap-x-6 col-start-1">
          <div className="product-card flex flex-col items-center py-11 px-4 w-[17.813rem] h-[21.875rem] z-10">
            <div className="relative flex flex-col items-center">
              <div className="absolute web-card-bg flex justify-center align-center h-[6.688rem] w-[14.8rem] bg-[#fc4cda] overflow-hidden">
                <Image
                  className="absolute left-2 -bottom-[2.5rem]" //-bottom-[1rem]
                  src="/product-card-bg.svg"
                  alt="product-card-bg"
                  width={125}
                  height={102.52}
                />
                <Image
                  className="absolute -right-2 -bottom-[3.3rem]" //-bottom-[3.3rem]
                  src="/product-card-bg-1.svg"
                  alt="product-card-bg"
                  width={160}
                  height={140}
                />
              </div>
              <div className="web-card items-center p-[0.688rem] w-[4.5rem] h-[4.5rem] z-[1]">
                <Image
                  className="ml-0.5"
                  src="/web-product.svg"
                  alt="web icon"
                  width={49.226}
                  height={45.272}
                />
              </div>
              <h2 className="font-lota text-center font-bold text-[2.5rem] mt-12 h-78">
                Web
              </h2>
              <p className="font-lotaLight text-center font-extralight text-gray-500 text-base mt-2">
                Lorem ipsum dolor sit amet, consectetur
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center py-11 px-[1.063rem] product-card w-[17.813rem] h-[21.875rem] z-10">
            <div className="flex flex-col items-center">
              <div className="absolute cms-card-bg flex justify-center align-center h-[6.688rem] w-[14.8rem] bg-[#3613fa] overflow-hidden">
                <Image
                  className="absolute left-2 -bottom-[2.5rem]"
                  src="/product-card-bg.svg"
                  alt="product-card-bg"
                  width={125}
                  height={102.52}
                />
                <Image
                  className="absolute -right-2 -bottom-[3.3rem]"
                  src="/product-card-bg-1.svg"
                  alt="product-card-bg"
                  width={160}
                  height={140}
                />
              </div>
              <div className="items-center p-[0.625rem] w-[4.5rem] h-[4.5rem] cms-card z-[1]">
                <Image
                  className="m-auto items-center mt-1"
                  src="/cms-product.svg"
                  alt="cms icon"
                  width={49.226}
                  height={45.272}
                />
              </div>
              <h2 className="font-lota text-center font-bold text-[2.5rem] mt-12 h-78">
                CMS
              </h2>
              <p className="font-lotaLight text-center font-extralight text-gray-500 text-base mt-2">
                Lorem ipsum dolor sit amet, consectetur
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center py-11 px-[1.063rem] product-card w-[17.813rem] h-[21.875rem] z-10">
            <div className="flex flex-col items-center">
              <div className="absolute mobile-card-bg flex justify-center align-center h-[6.688rem] w-[14.8rem] bg-[#3ae2e2] overflow-hidden">
                <Image
                  className="absolute left-2 -bottom-[2.5rem]"
                  src="/product-card-bg.svg"
                  alt="product-card-bg"
                  width={125}
                  height={102.52}
                />
                <Image
                  className="absolute -right-2 -bottom-[3.3rem]"
                  src="/product-card-bg-1.svg"
                  alt="product-card-bg"
                  width={160}
                  height={140}
                />
              </div>
              <div className="items-center justify-center p-[0.625rem] w-[4.5rem] h-[4.5rem] mobile-card z-[1]">
                <Image
                  className="items-center justify-center ml-3"
                  src="/mobile-product.svg"
                  alt="cms icon"
                  width={25.562}
                  height={49.655}
                />
              </div>
              <h2 className="font-lota text-center font-bold text-[2.5rem] mt-12 h-78">
                Mobile
              </h2>
              <p className="font-lotaLight text-center font-extralight text-gray-500 text-base mt-2">
                Lorem ipsum dolor sit amet, consectetur
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center py-11 px-[1.063rem] product-card w-[17.813rem] h-[21.875rem] z-10">
            <div className="flex flex-col items-center">
              <div className="absolute design-card-bg flex justify-center align-center h-[6.688rem] w-[14.8rem] bg-[#46b1ff] overflow-hidden">
                <Image
                  className="absolute left-2 -bottom-[2.5rem]"
                  src="/product-card-bg.svg"
                  alt="product-card-bg"
                  width={125}
                  height={102.52}
                />
                <Image
                  className="absolute -right-2 -bottom-[3.3rem]"
                  src="/product-card-bg-1.svg"
                  alt="product-card-bg"
                  width={160}
                  height={140}
                />
              </div>
              <div className="items-center p-[0.625rem] w-[4.5rem] h-[4.5rem] design-card z-[1]">
                <Image
                  className="ml-0.5"
                  src="/design-product.svg"
                  alt="design icon"
                  width={49.226}
                  height={45.272}
                />
              </div>
              <h2 className="font-lota text-center font-bold text-[2.5rem] mt-12 h-78">
                Design
              </h2>
              <p className="font-lotaLight text-center font-extralight text-gray-500 text-base mt-2">
                Lorem ipsum dolor sit amet, consectetur
              </p>
            </div>
          </div>
        </div>
        <Image
          className="col-start-1 row-start-1 mt-[18.75rem] ml-[12.313rem]"
          src="feature-bg-blue.svg"
          alt="bg"
          width={380}
          height={700}
        />
        <Image
          className="col-start-1 row-start-1 mt-[11.875rem] ml-[25rem]"
          src="feature-bg-pink.svg"
          alt="bg"
          width={800}
          height={800}
        />
      </section>
      <section className="relative footer grid grid-rows-3 justify-items-center items-center content-center h-[72.625rem] text-white overflow-hidden w-[95dvw] mx-auto">
        <div className="sticky -top-[16rem] z-10 row-start-1 h-[28.375rem] w-[38.75rem]">
          <div className="sticky-entry1 z-[11]">
            <Image
              className="absolute"
              src="/heroExpert1.svg"
              alt="heroexpert1"
              sizes="38.75rem"
              fill
              style={{ objectFit: "contain" }}
            />
          </div>
        </div>
        <div className="relative footer-head row-start-1 row-end-2 items-center flex-row justify-center z-[11]">
          <div className="relative content-span overflow-hidden">
            <span>
              <p className="text-center text-blue-500 mt-20 text-base">Team</p>
            </span>
          </div>
          <div className="relative content-span overflow-hidden">
            <span>
              <h2 className="text-center mt-3 text-[3.5rem] font-bold w-[48rem]">
                Meet Out Team
              </h2>
            </span>
          </div>
          <div className="relative content-span overflow-hidden">
            <span>
              <p className="flex items-center justify-center w-[48rem] text-center mt-[1rem] text-lg">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
                a lorem id justo mollis congue. Proin malesuada at ex vel
                pellentesque. Cras eget tellus ligula.
              </p>
            </span>
          </div>
        </div>
        <div
          style={{ "--count": 10, "--speed": 30 } as React.CSSProperties}
          data-translate="items"
          data-direction="horizontal"
          className="flex sticky-hero-end1 marquee-footer row-start-3 row-end-3 mb-72 h-[19.75rem] justify-center items-center gap-8 overflow-hidden z-[11]"
        >
          <ul className="marquee-footer-content">
            <li style={{ "--index": 0 } as React.CSSProperties}>
              <div className="flex flex-col flex-start rounded-[1.25rem] h-[19.75rem] w-[17.5rem] p-6 card">
                <div className="flex flex-col items-center justify-center">
                  <Image
                    className="mb-5"
                    src="/Abby.svg"
                    alt="Abby"
                    width={80}
                    height={80}
                  />
                  <h4 className="flex text-center font-manropeRegular font-semibold text-lg">
                    Abby
                  </h4>
                  <p className="text-base font-normal text-blue-500 mb-2">
                    CEO
                  </p>
                  <p className="font-manropeRegular text-base text-center">
                    Former co-founder of Opendoor. Early staff at Spotify and
                    Clearbit.
                  </p>
                  <div className="flex mt-4 gap-4">
                    <Image
                      src="/linkedin-icon.svg"
                      alt="linkedin"
                      width={20}
                      height={20}
                    />
                    <Image
                      src="/twitter-icon.svg"
                      alt="twitter"
                      width={20}
                      height={20}
                    />
                    <Image
                      src="/web-icon.svg"
                      alt="web"
                      width={20}
                      height={20}
                    />
                  </div>
                </div>
              </div>
            </li>
            <li style={{ "--index": 1 } as React.CSSProperties}>
              <div className="flex flex-col flex-start rounded-[1.25rem] h-[19.75rem] w-[17.5rem] p-6 card">
                <div className="flex flex-col items-center justify-center">
                  <Image
                    className="mb-5"
                    src="/Riki.svg"
                    alt="Riki"
                    width={80}
                    height={80}
                  />
                  <h4 className="flex text-center font-manropeRegular font-semibold text-lg">
                    Riki
                  </h4>
                  <p className="text-base font-normal text-blue-500 mb-2">
                    CTO
                  </p>
                  <p className="font-manropeRegular text-base text-center">
                    Former co-founder of Opendoor. Early staff at Spotify and
                    Clearbit.
                  </p>
                  <div className="flex flex-row mt-4 gap-4">
                    <Image
                      src="/linkedin-icon.svg"
                      alt="linkedin"
                      width={20}
                      height={20}
                    />
                    <Image
                      src="/twitter-icon.svg"
                      alt="twitter"
                      width={20}
                      height={20}
                    />
                    <Image
                      src="/web-icon.svg"
                      alt="web"
                      width={20}
                      height={20}
                    />
                  </div>
                </div>
              </div>
            </li>
            <li style={{ "--index": 2 } as React.CSSProperties}>
              <div className="flex flex-col flex-start rounded-[1.25rem] h-[19.75rem] w-[17.5rem] p-6 card">
                <div className="flex flex-col items-center justify-center">
                  <Image
                    className="mb-5"
                    src="/Andre.svg"
                    alt="Andre"
                    width={80}
                    height={80}
                  />
                  <h4 className="flex text-center font-manropeRegular font-semibold text-lg">
                    Andre
                  </h4>
                  <p className="text-base font-normal text-blue-500 mb-2">
                    CMO
                  </p>
                  <p className="font-manropeRegular text-base text-center">
                    Former co-founder of Opendoor. Early staff at Spotify and
                    Clearbit.
                  </p>
                  <div className="flex flex-row mt-4 gap-4">
                    <Image
                      src="/linkedin-icon.svg"
                      alt="linkedin"
                      width={20}
                      height={20}
                    />
                    <Image
                      src="/twitter-icon.svg"
                      alt="twitter"
                      width={20}
                      height={20}
                    />
                    <Image
                      src="/web-icon.svg"
                      alt="web"
                      width={20}
                      height={20}
                    />
                  </div>
                </div>
              </div>
            </li>
            <li style={{ "--index": 3 } as React.CSSProperties}>
              <div className="flex flex-col flex-start rounded-[1.25rem] h-[19.75rem] w-[17.5rem] p-6 card">
                <div className="flex flex-col items-center justify-center">
                  <Image
                    className="mb-5"
                    src="/Irfan.svg"
                    alt="Irfan"
                    width={80}
                    height={80}
                  />
                  <h4 className="flex text-center font-manropeRegular font-semibold text-lg">
                    Irfan
                  </h4>
                  <p className="text-base font-normal text-blue-500 mb-2">
                    Designer
                  </p>
                  <p className="font-manropeRegular text-base text-center">
                    Former co-founder of Opendoor. Early staff at Spotify and
                    Clearbit.
                  </p>
                  <div className="flex flex-row mt-4 gap-4">
                    <Image
                      src="/linkedin-icon.svg"
                      alt="linkedin"
                      width={20}
                      height={20}
                    />
                    <Image
                      src="/twitter-icon.svg"
                      alt="twitter"
                      width={20}
                      height={20}
                    />
                    <Image
                      src="/web-icon.svg"
                      alt="web"
                      width={20}
                      height={20}
                    />
                  </div>
                </div>
              </div>
            </li>
            <li style={{ "--index": 4 } as React.CSSProperties}>
              <div className="flex flex-col flex-start rounded-[1.25rem] h-[19.75rem] w-[17.5rem] p-6 card">
                <div className="flex flex-col items-center justify-center">
                  <Image
                    className="mb-5"
                    src="/Arif.svg"
                    alt="Arif"
                    width={80}
                    height={80}
                  />
                  <h4 className="flex text-center font-manropeRegular font-semibold text-lg">
                    Arif
                  </h4>
                  <p className="text-base font-normal text-blue-500 mb-2">
                    Developer
                  </p>
                  <p className="font-manropeRegular text-base text-center">
                    Former co-founder of Opendoor. Early staff at Spotify and
                    Clearbit.
                  </p>
                  <div className="flex flex-row mt-4 gap-4">
                    <Image
                      src="/linkedin-icon.svg"
                      alt="linkedin"
                      width={20}
                      height={20}
                    />
                    <Image
                      src="/twitter-icon.svg"
                      alt="twitter"
                      width={20}
                      height={20}
                    />
                    <Image
                      src="/web-icon.svg"
                      alt="web"
                      width={20}
                      height={20}
                    />
                  </div>
                </div>
              </div>
            </li>
            <li style={{ "--index": 5 } as React.CSSProperties}>
              <div className="flex flex-col flex-start rounded-[1.25rem] h-[19.75rem] w-[17.5rem] p-6 card">
                <div className="flex flex-col items-center justify-center">
                  <Image
                    className="mb-5"
                    src="/Abby.svg"
                    alt="Abby"
                    width={80}
                    height={80}
                  />
                  <h4 className="flex text-center font-manropeRegular font-semibold text-lg">
                    Abby
                  </h4>
                  <p className="text-base font-normal text-blue-500 mb-2">
                    CEO
                  </p>
                  <p className="font-manropeRegular text-base text-center">
                    Former co-founder of Opendoor. Early staff at Spotify and
                    Clearbit.
                  </p>
                  <div className="flex mt-4 gap-4">
                    <Image
                      src="/linkedin-icon.svg"
                      alt="linkedin"
                      width={20}
                      height={20}
                    />
                    <Image
                      src="/twitter-icon.svg"
                      alt="twitter"
                      width={20}
                      height={20}
                    />
                    <Image
                      src="/web-icon.svg"
                      alt="web"
                      width={20}
                      height={20}
                    />
                  </div>
                </div>
              </div>
            </li>
            <li style={{ "--index": 6 } as React.CSSProperties}>
              <div className="flex flex-col flex-start rounded-[1.25rem] h-[19.75rem] w-[17.5rem] p-6 card">
                <div className="flex flex-col items-center justify-center">
                  <Image
                    className="mb-5"
                    src="/Riki.svg"
                    alt="Riki"
                    width={80}
                    height={80}
                  />
                  <h4 className="flex text-center font-manropeRegular font-semibold text-lg">
                    Riki
                  </h4>
                  <p className="text-base font-normal text-blue-500 mb-2">
                    CTO
                  </p>
                  <p className="font-manropeRegular text-base text-center">
                    Former co-founder of Opendoor. Early staff at Spotify and
                    Clearbit.
                  </p>
                  <div className="flex flex-row mt-4 gap-4">
                    <Image
                      src="/linkedin-icon.svg"
                      alt="linkedin"
                      width={20}
                      height={20}
                    />
                    <Image
                      src="/twitter-icon.svg"
                      alt="twitter"
                      width={20}
                      height={20}
                    />
                    <Image
                      src="/web-icon.svg"
                      alt="web"
                      width={20}
                      height={20}
                    />
                  </div>
                </div>
              </div>
            </li>
            <li style={{ "--index": 7 } as React.CSSProperties}>
              <div className="flex flex-col flex-start rounded-[1.25rem] h-[19.75rem] w-[17.5rem] p-6 card">
                <div className="flex flex-col items-center justify-center">
                  <Image
                    className="mb-5"
                    src="/Andre.svg"
                    alt="Andre"
                    width={80}
                    height={80}
                  />
                  <h4 className="flex text-center font-manropeRegular font-semibold text-lg">
                    Andre
                  </h4>
                  <p className="text-base font-normal text-blue-500 mb-2">
                    CMO
                  </p>
                  <p className="font-manropeRegular text-base text-center">
                    Former co-founder of Opendoor. Early staff at Spotify and
                    Clearbit.
                  </p>
                  <div className="flex flex-row mt-4 gap-4">
                    <Image
                      src="/linkedin-icon.svg"
                      alt="linkedin"
                      width={20}
                      height={20}
                    />
                    <Image
                      src="/twitter-icon.svg"
                      alt="twitter"
                      width={20}
                      height={20}
                    />
                    <Image
                      src="/web-icon.svg"
                      alt="web"
                      width={20}
                      height={20}
                    />
                  </div>
                </div>
              </div>
            </li>
            <li style={{ "--index": 8 } as React.CSSProperties}>
              <div className="flex flex-col flex-start rounded-[1.25rem] h-[19.75rem] w-[17.5rem] p-6 card">
                <div className="flex flex-col items-center justify-center">
                  <Image
                    className="mb-5"
                    src="/Irfan.svg"
                    alt="Irfan"
                    width={80}
                    height={80}
                  />
                  <h4 className="flex text-center font-manropeRegular font-semibold text-lg">
                    Irfan
                  </h4>
                  <p className="text-base font-normal text-blue-500 mb-2">
                    Designer
                  </p>
                  <p className="font-manropeRegular text-base text-center">
                    Former co-founder of Opendoor. Early staff at Spotify and
                    Clearbit.
                  </p>
                  <div className="flex flex-row mt-4 gap-4">
                    <Image
                      src="/linkedin-icon.svg"
                      alt="linkedin"
                      width={20}
                      height={20}
                    />
                    <Image
                      src="/twitter-icon.svg"
                      alt="twitter"
                      width={20}
                      height={20}
                    />
                    <Image
                      src="/web-icon.svg"
                      alt="web"
                      width={20}
                      height={20}
                    />
                  </div>
                </div>
              </div>
            </li>
            <li style={{ "--index": 9 } as React.CSSProperties}>
              <div className="flex flex-col flex-start rounded-[1.25rem] h-[19.75rem] w-[17.5rem] p-6 card">
                <div
                  ref={triggerRef}
                  className="flex flex-col sticky-hero1-end items-center justify-center"
                >
                  <Image
                    className="mb-5"
                    src="/Arif.svg"
                    alt="Arif"
                    width={80}
                    height={80}
                  />
                  <h4 className="flex text-center font-manropeRegular font-semibold text-lg">
                    Arif
                  </h4>
                  <p className="text-base font-normal text-blue-500 mb-2">
                    Developer
                  </p>
                  <p className="font-manropeRegular text-base text-center">
                    Former co-founder of Opendoor. Early staff at Spotify and
                    Clearbit.
                  </p>
                  <div className="flex flex-row mt-4 gap-4">
                    <Image
                      src="/linkedin-icon.svg"
                      alt="linkedin"
                      width={20}
                      height={20}
                    />
                    <Image
                      src="/twitter-icon.svg"
                      alt="twitter"
                      width={20}
                      height={20}
                    />
                    <Image
                      src="/web-icon.svg"
                      alt="web"
                      width={20}
                      height={20}
                    />
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
}
