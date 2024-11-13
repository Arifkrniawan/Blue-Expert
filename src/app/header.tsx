"use client";
import { useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";

export default function Header() {
  useEffect(() => {
    const root = document.documentElement;
    const marqueeElementsDisplayed = getComputedStyle(root).getPropertyValue(
      "--marquee-elements-displayed"
    );
    const marqueeContent = document.querySelector("ul.marquee-content");

    window.addEventListener("load", ()=>{
      const tl = gsap.timeline();
      
      tl.to('header', {
        background:'#ffffff',
        duration:1.5,
        scaleX:0.95,
        ease:'power2.out'
      })
      .to('header',{
        background:'#0D100D',
        scaleX:1,
        duration: 1.5,
        ease:'power2.out'
      });
    })
    

    if (marqueeContent) {
      root.style.setProperty(
        "--marquee-elements",
        String(marqueeContent.children.length)
      );
      for (let i = 0; i < Number(marqueeElementsDisplayed); i++) {
        marqueeContent.appendChild(marqueeContent.children[i].cloneNode(true));
      }
    }
  });

  return (
    <header className="header flex relative flex-col text-white w-[95%] mx-auto bg-[#0D100D]">
      <div className="relative container mx-auto grid grid-rows-2 h-[80.87dvh] w-[90dvw] content-center item-center justify-items-center overflow-hidden">
        <Image
          className="slide-up absolute left-0 -bottom-8"
          src="/studioDisplay1.svg"
          alt="studio display"
          width={398}
          height={424}
        />
        <Image
          className="absolute slide-up top-[18.625rem] right-0"
          src="/studioDisplay2.svg"
          alt="studio Display"
          width={752}
          height={578}
        />
        <Image
          className="absolute slide-up -bottom-80"
          src="/hero-ellipse-bg.svg"
          alt="ellipse-bg"
          width={1440}
          height={966}
        />
        <Image
          className="absolute slide-up left-[12.5625rem] bottom-0 top-[21.0625rem]"
          src="/heroExpert.svg"
          alt="heroexpert"
          width={620}
          height={454}
        />
        <Image
        className="absolute border-0 right-0"
        src="vector-6.svg"
        alt="vector6"
        width={901}
        height={952}/>
        <div className="relative grid grid-cols-2">
          <div className="relative grid overflow-x-hidden grid-cols-3 grid-rows-3 col-start-1 col-end-1 mt-12 w-[657px] h-[266px]">
            <div className="relative content-span grid col-start-1 col-end-4 row-start-1 row-end-2 h-[6.5rem]">
              <span>
                <Image
                  className="absolute w-[48px] h-[75.887px] ml-[1.6875rem]"
                  src="/logosemut.svg"
                  alt="logo"
                  width={180}
                  height={37}
                />
                <h1 className="relative firstTitle leading-[6.5rem] font-lota text-7xl tracking-custom row-start-1">
                  <b>Create</b> website
                </h1>
                <Image
                  className="ml-16 mt-[-1rem] splash"
                  src="/imageslash.svg"
                  alt="img"
                  width={262.636}
                  height={16.507}
                />
              </span>
            </div>

            <div className="content-span grid col-start-1 col-end-4 row-start-2 row-end-2">
              <span>
                <h1 className="font-lota text-7xl tracking-custom">
                  with less work
                </h1>
              </span>
            </div>

            <button className="slide-up button self-end py-4 px-8 col-start-1 col-end-2 w-[232px] h-[56px] row-start-3 row-end-3 font-beeboMedium">
              Explore BlueXpert
              <Image
                src="/link-button.svg"
                alt="link-button"
                width={20}
                height={20}
              />
            </button>
          </div>
          <div className="relative grid grid-rows-2 col-start-2 col-end-3 mt-12 mr-[5.1875rem] ml-56 h-[266px]">
            <div className="relative grid col-start-1 col-end-1 font-manropeRegular">
              <p className="header-slide-up content-span">
                Lorem ipsum dolor sit amet.
                <br className="header-slide-up content-span" />
                Quisque malesuada ipsum nulla.
                <br className="header-slide-up content-span"/>
                Cras eget leo vel velit.
              </p>
            </div>
            <div className="relative grid slide-up col-start-1 col-end-1 row-start-2 row-end-2">
              <Image
                className="absolute z-5 mt-[-0.8rem] z-4"
                src="review-photo.svg"
                alt="testi0"
                width={40}
                height={40}
              />
              <Image
                className="absolute ml-7 z-3 mt-[-0.8rem]"
                src="review-photo1.svg"
                alt="testi0"
                width={40}
                height={40}
              />
              <Image
                className="absolute ml-14 z-2 mt-[-0.8rem]"
                src="review-photo2.svg"
                alt="testi0"
                width={40}
                height={40}
              />
              <Image
                className="absolute ml-[5.25rem] z-1 mt-[-0.8rem]"
                src="review-photo3.svg"
                alt="testi0"
                width={40}
                height={40}
              />
              <p className="font-manropeRegular mt-8">6k+ reviews (4.8 of 5)</p>
            </div>
          </div>
        </div>

      </div>
      <div className="relative flex left-[50%] right-[50%] h-[10.85dvh] ml-[-50dvw] mr-[-50dvw] bg-blue-400">
        <div className="RT1 w-64 content-center font-manropeRegular">
          <p className="my-8 w-[10.9rem] ml-8 mr-[3.75rem] h-[2.5rem] text-xs text-black leading-snug">
            Leading in the Business World: Our Clients
          </p>
        </div>
        <div className="marquee my-8 h-[2.5rem] w-[10.9rem]">
          <ul className="marquee-content">
            <li>
              <Image src="bartha.svg" alt="" width={10.25} height={40} />
            </li>
            <li>
              <Image src="pvj.svg" alt="" width={10.25} height={40} />
            </li>
            <li>
              <Image src="bartha.svg" alt="" width={10.25} height={40} />
            </li>
            <li>
              <Image src="pvj.svg" alt="" width={10.25} height={40} />
            </li>
            <li>
              <Image src="bartha.svg" alt="" width={10.25} height={40} />
            </li>
            <li>
              <Image src="pvj.svg" alt="" width={10.25} height={40} />
            </li>
            <li>
              <Image src="bartha.svg" alt="" width={10.25} height={40} />
            </li>
            <li>
              <Image src="pvj.svg" alt="" width={10.25} height={40} />
            </li>
          </ul>
        </div>
      </div>
      <div className="relative flex flex-col h-[1599px] text-white text-[18.7px]">
        <div className="Justify-center items-center mx-auto">
          <p className="text-center text-blue-500 mt-20 text-base w-[768px]">
            Work & Project
          </p>
          <h2 className="text-center mt-3 text-[56px] font-bold w-[768px]">
            Our Latest Work
          </h2>
          <p className="flex text-center mt-[1rem] text-lg w-[768px]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus a
            lorem id justo mollis congue. Proin malesuada at ex vel
            pellentesque. Cras eget tellus ligula.
          </p>
        </div>
        <div className="relative flex justify-center slider mx-auto h-[1599px]">
          <div className="item-slider">
            <Image
              className="active"
              src="/bg-bartha.svg"
              width={1240}
              height={930}
              alt="bartha-bg"
            />
            <Image
              src="/bg-maximus.svg"
              width={1240}
              height={930}
              alt="bartha-bg"
            />
            <Image
              src="/bg-prisma.svg"
              width={1240}
              height={930}
              alt="bartha-bg"
            />
            <Image
              src="/bg-trebel.svg"
              width={1240}
              height={930}
              alt="bartha-bg"
            />
          </div>
        </div>
        <div className="flex flex-col justify-center items-center mt-20 gap-y-5">
          <p className="text-center">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
            dignissim a leo nec vulputate. <br />
            Cras mattis porta dolor in viverra.
          </p>

          <a className="see-all" href="">
            See All{" "}
          </a>
        </div>
      </div>
    </header>
  );
}
