"use client";
import Image from "next/image";
import { useEffect } from "react";

export default function Home() {
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
  });

  return (
    <main className="relative flex flex-col bg-inherit">
      <section className="grid grid-row-2 h-screen bg-white">
        <div className="row-start-1 row-end-1 flex flex-col justify-center items-center m-auto mt-0 col-start-1">
          <p className="text-center text-blue-500 mt-20 text-base">Feature</p>
          <h2 className="text-center text-[56px] font-bold font-lota mb-5">
            Elevate With Our Features!
          </h2>
          <p className="text-center font-manropeRegular text-[18.7px] text-gray-600 w-[768px] m-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
        <div className="flex row-start-1 row-end-2 mt-[346px] justify-center gap-x-6 col-start-1">
          <div className="flex flex-col items-center py-12 px-[17px] product-card w-[285px] h-[350px] z-10">
            <div className="flex flex-col items-center">
              <div className="items-center p-[11px] w-[72px] h-[72px] web-card">
                <Image
                  className="ml-0.5"
                  src="/web-product.svg"
                  alt="web icon"
                  width={49.226}
                  height={45.272}
                />
              </div>
              <h2 className="font-lota text-center font-bold text-[40px] mt-9 h-78">
                Web
              </h2>
              <p className="font-lotaLight text-center font-extralight text-gray-500 text-base mt-2">
                Lorem ipsum dolor sit amet, consectetur
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center py-12 px-[17px] product-card w-[285px] h-[350px] z-10">
            <div className="flex flex-col items-center">
              <div className="items-center p-[11px] w-[72px] h-[72px] cms-card">
                <Image
                  className="m-auto items-center mt-1"
                  src="/cms-product.svg"
                  alt="cms icon"
                  width={49.226}
                  height={45.272}
                />
              </div>
              <h2 className="font-lota text-center font-bold text-[40px] mt-9 h-78">
                CMS
              </h2>
              <p className="font-lotaLight text-center font-extralight text-gray-500 text-base mt-2">
                Lorem ipsum dolor sit amet, consectetur
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center py-12 px-[17px] product-card w-[285px] h-[350px] z-10">
            <div className="flex flex-col items-center">
              <div className="items-center justify-center p-[11px] w-[72px] h-[72px] mobile-card">
                <Image
                  className="items-center justify-center ml-3"
                  src="/mobile-product.svg"
                  alt="cms icon"
                  width={25.562}
                  height={49.655}
                />
              </div>
              <h2 className="font-lota text-center font-bold text-[40px] mt-9 h-78">
                Mobile
              </h2>
              <p className="font-lotaLight text-center font-extralight text-gray-500 text-base mt-2">
                Lorem ipsum dolor sit amet, consectetur
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center py-12 px-[17px] product-card w-[285px] h-[350px] z-10">
            <div className="flex flex-col items-center">
              <div className="items-center p-[11px] w-[72px] h-[72px] design-card">
                <Image
                  className="ml-0.5"
                  src="/design-product.svg"
                  alt="design icon"
                  width={49.226}
                  height={45.272}
                />
              </div>
              <h2 className="font-lota text-center font-bold text-[40px] mt-9 h-78">
                Design
              </h2>
              <p className="font-lotaLight text-center font-extralight text-gray-500 text-base mt-2">
                Lorem ipsum dolor sit amet, consectetur
              </p>
            </div>
          </div>
        </div>
        <Image
          className="col-start-1 row-start-1 mt-[300px] ml-[197px]"
          src="feature-bg-blue.svg"
          alt="bg"
          width={380}
          height={700}
        />
        <Image
          className="col-start-1 row-start-1 mt-[190px] ml-[400px]"
          src="feature-bg-pink.svg"
          alt="bg"
          width={800}
          height={800}
        />
      </section>

      <section className="footer grid grid-rows-3 h-[1162px] text-white overflow-hidden w-[95%] mx-auto bg-[#0D100D] mt-16">
        <div className="row-start-1 row-end-2 items-center flex-row justify-center w-dvh m-auto">
          <p className="text-center text-blue-500 mt-20 text-base">Team</p>
          <h2 className="text-center mt-3 text-[56px] font-bold w-[768px]">
            Meet Out Team
          </h2>
          <p className="flex items-center justify-center w-[768px] text-center mt-[1rem] text-lg">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus a
            lorem id justo mollis congue. Proin malesuada at ex vel
            pellentesque. Cras eget tellus ligula.
          </p>
          <Image
            className="relative w-[620px] h-[454px] flex-row mt-8"
            src="/heroExpert.svg"
            alt="heroexpert"
            width={180}
            height={37}
          />
        </div>
        <div className="flex row-start-2 row-end-3 mt-72 h-[316px] w-dvh justify-center items-center gap-8 overflow-hidden">
          <div className="flex flex-col flex-start rounded-[20px] h-[316px] w-[280px] p-6 card">
            <div className="flex flex-col items-center justify-center">
              <Image
                className="flex flex-column items-center justify-center mb-[20px]"
                src="/Abby.svg"
                alt="Abby"
                width={80}
                height={80}
              />
              <h4 className="flex text-Center font-manropeRegular font-semibold text-lg">
                Abby
              </h4>
              <p className="text-base font-normal text-blue-500 mb-2">CEO</p>
              <p className="font-manropeRegular text-base text-center">
                Former co-founder of Opendoor. Early staff at Spotify and
                Clearbit.
              </p>
              <div className="flex flex-row mt-4 gap-4">
                <Image
                  className="flex"
                  src="/linkedin-icon.svg"
                  alt="linkedin"
                  width={20}
                  height={20}
                />
                <Image
                  src="/twitter-icon.svg"
                  alt="linkedin"
                  width={20}
                  height={20}
                />
                <Image
                  src="/web-icon.svg"
                  alt="linkedin"
                  width={20}
                  height={20}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col flex-start rounded-[20px] h-[316px] w-[280px] p-6 card">
            <div className="flex flex-col items-center justify-center">
              <Image
                className="flex flex-column items-center justify-center mb-[20px]"
                src="/Riki.svg"
                alt="Riki"
                width={80}
                height={80}
              />
              <h4 className="flex text-Center font-manropeRegular font-semibold text-lg">
                Riki
              </h4>
              <p className="text-base font-normal text-blue-500 mb-2">CTO</p>
              <p className="font-manropeRegular text-base text-center">
                Former co-founder of Opendoor. Early staff at Spotify and
                Clearbit.
              </p>
              <div className="flex flex-row mt-4 gap-4">
                <Image
                  className="flex"
                  src="/linkedin-icon.svg"
                  alt="linkedin"
                  width={20}
                  height={20}
                />
                <Image
                  src="/twitter-icon.svg"
                  alt="linkedin"
                  width={20}
                  height={20}
                />
                <Image
                  src="/web-icon.svg"
                  alt="linkedin"
                  width={20}
                  height={20}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col flex-start rounded-[20px] h-[316px] w-[280px] p-6 card">
            <div className="flex flex-col items-center justify-center">
              <Image
                className="flex flex-column items-center justify-center mb-[20px]"
                src="/Andre.svg"
                alt="Andre"
                width={80}
                height={80}
              />
              <h4 className="flex text-Center font-manropeRegular font-semibold text-lg">
                Andre
              </h4>
              <p className="text-base font-normal text-blue-500 mb-2">CMO</p>
              <p className="font-manropeRegular text-base text-center">
                Former co-founder of Opendoor. Early staff at Spotify and
                Clearbit.
              </p>
              <div className="flex flex-row mt-4 gap-4">
                <Image
                  className="flex"
                  src="/linkedin-icon.svg"
                  alt="linkedin"
                  width={20}
                  height={20}
                />
                <Image
                  src="/twitter-icon.svg"
                  alt="linkedin"
                  width={20}
                  height={20}
                />
                <Image
                  src="/web-icon.svg"
                  alt="linkedin"
                  width={20}
                  height={20}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col flex-start rounded-[20px] h-[316px] w-[280px] p-6 card">
            <div className="flex flex-col items-center justify-center">
              <Image
                className="flex flex-column items-center justify-center mb-[20px]"
                src="/Irfan.svg"
                alt="Irfan"
                width={80}
                height={80}
              />
              <h4 className="flex text-Center font-manropeRegular font-semibold text-lg">
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
                  className="flex"
                  src="/linkedin-icon.svg"
                  alt="linkedin"
                  width={20}
                  height={20}
                />
                <Image
                  src="/twitter-icon.svg"
                  alt="linkedin"
                  width={20}
                  height={20}
                />
                <Image
                  src="/web-icon.svg"
                  alt="linkedin"
                  width={20}
                  height={20}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
