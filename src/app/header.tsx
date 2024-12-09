"use client";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Observer } from "gsap/Observer";
// import useScrollAnimationStore from "../state/ScrollStore";

export default function Header() {
  const [flash, setFlashed] = useState(false);
  const heroRef = useRef<HTMLImageElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(Observer);

    interface HorizontalLoopConfig {
      repeat?: number;
      paused?: boolean;
      speed?: number;
      snap?: number | boolean;
      paddingRight?: number;
      reversed?: boolean;
    }

    interface EnhancedTimeline extends gsap.core.Timeline {
      next: (vars?: gsap.TweenVars) => gsap.core.Tween;
      previous: (vars?: gsap.TweenVars) => gsap.core.Tween;
      current: () => number;
      toIndex: (index: number, vars?: gsap.TweenVars) => gsap.core.Tween;
      times: number[];
    }

    function horizontalLoop(
      items: HTMLElement[],
      config: HorizontalLoopConfig = {}
    ): EnhancedTimeline {
      // Convert items to array and ensure config exists
      items = gsap.utils.toArray(items);

      // Default config
      const defaultConfig: HorizontalLoopConfig = {
        repeat: 0,
        paused: false,
        speed: 1,
        snap: 1,
      };
      config = { ...defaultConfig, ...config };

      // Create timeline with enhanced typing
      const tl = gsap.timeline({
        repeat: config.repeat,
        paused: config.paused,
        defaults: { ease: "none" },
        onReverseComplete: () => {
          (tl as EnhancedTimeline).totalTime(
            tl.rawTime() + tl.duration() * 100
          );
        },
      }) as EnhancedTimeline;

      const length = items.length;
      const startX = items[0].offsetLeft;
      const times: number[] = [];
      const widths: number[] = [];
      const xPercents: number[] = [];
      let curIndex = 0;

      // Calculate pixels per second
      const pixelsPerSecond = (config.speed || 1) * 100;

      // Snap function
      const snap =
        config.snap === false
          ? (v: number) => v
          : gsap.utils.snap(typeof config.snap === "number" ? config.snap : 0);

      // Declare variables
      let totalWidth: number;
      let curX: number;
      let distanceToStart: number;
      let distanceToLoop: number;
      let item: HTMLElement;

      // Set initial xPercent for responsive layout
      gsap.set(items, {
        xPercent: (i, el) => {
          const w = (widths[i] = parseFloat(
            gsap.getProperty(el, "width", "px") as string
          ));
          xPercents[i] = snap(
            (parseFloat(gsap.getProperty(el, "x", "px") as string) / w) * 100 +
              parseFloat(gsap.getProperty(el, "xPercent") as string)
          );
          return xPercents[i];
        },
      });

      // Reset x position
      gsap.set(items, { x: 0 });

      const paddingRight =
        config.paddingRight !== undefined
          ? parseFloat(config.paddingRight.toString())
          : 0;

      // Calculate total width
      totalWidth =
        items[length - 1].offsetLeft +
        (xPercents[length - 1] / 100) * widths[length - 1] -
        startX +
        items[length - 1].offsetWidth *
          parseFloat(gsap.getProperty(items[length - 1], "scaleX") as string) +
        paddingRight;

      // Create animations for each item
      for (let i = 0; i < length; i++) {
        item = items[i];
        curX = (xPercents[i] / 100) * widths[i];
        distanceToStart = item.offsetLeft + curX - startX;
        distanceToLoop =
          distanceToStart +
          widths[i] * parseFloat(gsap.getProperty(item, "scaleX") as string);

        tl.to(
          item,
          {
            xPercent: snap(((curX - distanceToLoop) / widths[i]) * 100),
            duration: distanceToLoop / pixelsPerSecond,
          },
          0
        )
          .fromTo(
            item,
            {
              xPercent: snap(
                ((curX - distanceToLoop + totalWidth) / widths[i]) * 100
              ),
            },
            {
              xPercent: xPercents[i],
              duration:
                (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
              immediateRender: false,
            },
            distanceToLoop / pixelsPerSecond
          )
          .add(`label${i}`, distanceToStart / pixelsPerSecond);

        times[i] = distanceToStart / pixelsPerSecond;
      }

      // Helper function to move to a specific index
      function toIndex(
        index: number,
        vars: gsap.TweenVars = {}
      ): gsap.core.Tween {
        // Ensure shortest path
        Math.abs(index - curIndex) > length / 2 &&
          (index += index > curIndex ? -length : length);

        const newIndex = gsap.utils.wrap(0, length, index);
        let time = times[newIndex];

        // Handle timeline wrapping
        if (time > tl.time() !== index > curIndex) {
          vars.modifiers = {
            time: gsap.utils.wrap(0, tl.duration()),
          };
          time += tl.duration() * (index > curIndex ? 1 : -1);
        }

        curIndex = newIndex;
        vars.overwrite = true;
        return tl.tweenTo(time, vars);
      }

      // Extend timeline with custom methods
      tl.next = (vars) => toIndex(curIndex + 1, vars);
      tl.previous = (vars) => toIndex(curIndex - 1, vars);
      tl.current = () => curIndex;
      tl.toIndex = (index, vars) => toIndex(index, vars);
      tl.times = times;

      // Pre-render for performance
      tl.progress(1, true).progress(0, true);

      // Handle reversed config
      if (config.reversed && tl.vars?.onReverseComplete) {
        tl.vars.onReverseComplete();
        tl.reverse();
      }

      return tl;
    }

    // Usage example
    const scrollingText = gsap.utils.toArray(
      ".marquee-content li"
    ) as HTMLElement[];

    const tl = horizontalLoop(scrollingText, {
      repeat: -1,
    });

    // const root = document.documentElement;
    // const marqueeElementsDisplayed = getComputedStyle(root).getPropertyValue(
    //   "--marquee-elements-displayed"
    // );
    // const marqueeContent = document.querySelector("ul.marquee-content");

    // if (marqueeContent) {
    //   root.style.setProperty(
    //     "--marquee-elements",
    //     String(marqueeContent.children.length)
    //   );
    //   for (let i = 0; i < Number(marqueeElementsDisplayed); i++) {
    //     marqueeContent.appendChild(marqueeContent.children[i].cloneNode(true));
    //   }
    // }
  }, []);

  return (
    <header
      onMouseEnter={() => {
        if (!flash) {
          setFlashed(true);
        }
      }}
      style={{
        animation: flash ? "backgroundFlashing 1s ease-in-out" : "none",
      }}
      className={`header flex relative flex-col text-white w-[95%] mx-auto bg-[#0D100D] oveflow-hidden`}
    >
      <Image
        className="absolute border-0 left-0 h-[49.4375rem]"
        src="/vector-7.svg"
        alt="vector7"
        width={640}
        height={787}
      />
      <Image
        className="absolute border-0 right-0 top-18 h-[49.4375rem]"
        src="/vector-6.svg"
        alt="vector6"
        width={640}
        height={791}
      />
      <div className="relative container mx-auto grid grid-rows-2 h-[80.87dvh] w-[80dvw] content-center item-center justify-items-center overflow-hidden">
        <Image
          className="slide-up-50 absolute left-0 bottom-0"
          src="/studioDisplay1.svg"
          alt="studio display"
          width={398}
          height={424}
        />
        <Image
          className="absolute slide-up-50 top-[18.625rem] right-0"
          src="/studioDisplay2.svg"
          alt="studio Display"
          width={752}
          height={578}
        />
        <Image
          className="absolute slide-up-50 -bottom-80"
          src="/hero-ellipse-bg.svg"
          alt="ellipse-bg"
          width={1440}
          height={966}
        />
        <div className="relative grid grid-cols-2 row-start-1">
          <div className="relative animation-slideup grid overflow-hidden grid-cols-3 grid-rows-3 col-start-1 col-end-1 mt-12 w-[43rem] h-[16.625rem]">
            <div className="relative content-span grid col-start-1 col-end-4 row-start-1 row-end-2 h-[6.5rem]">
              <span className="flex slide-up-100">
                <Image
                  className="mr-4 relative w-[48px] h-[4.75rem] ml-[1.6875rem]"
                  src="/logosemut.svg"
                  alt="logo"
                  width={180}
                  height={37}
                />
                <h1 className="relative firstTitle leading-[6.5rem] font-lota text-7xl tracking-custom row-start-1">
                  <b>Create</b> websites
                </h1>
                <Image
                  className="absolute ml-16 mt-20 splash"
                  src="/imageslash.svg"
                  alt="img"
                  width={262.636}
                  height={16.507}
                />
              </span>
            </div>

            <div className="content-span grid col-start-1 col-end-4 row-start-2 row-end-2">
              <span className="slide-up-100">
                <h1 className="font-lota text-7xl tracking-custom">
                  with less work
                </h1>
              </span>
            </div>

            <button className="slide-up-50 button self-end py-4 px-8 col-start-1 col-end-2 w-[232px] h-[56px] row-start-3 row-end-3 font-beeboMedium">
              Explore BlueXpert
              <Image
                src="/link-button.svg"
                alt="link-button"
                width={20}
                height={20}
              />
            </button>
          </div>
          <div className="relative grid grid-rows-2 col-start-2 col-end-3 mt-12 ml-[11.625rem] h-[16.625rem]">
            <div className="relative grid col-start-1 col-end-1 font-manropeRegular w-[22rem]">
              <p className="slide-up-100 text-[1rem] content-span">
                Lorem ipsum dolor sit amet, consectetur
                <br className="slide-up-100 content-span" />
                Quisque malesuada ipsum nulla.
                <br className="slide-up-100 content-span" />
                Vestibulum ante ipsum primis in faucibus
              </p>
            </div>
            <div className="header-last-element relative grid slide-up-50 slideUp col-start-1 col-end-1 row-start-2 row-end-2">
              <Image
                className="absolute mt-[-0.8rem] z-4"
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
              <Image
                className="arrow absolute right-36 bottom-4"
                src="/arrow.png"
                width={68}
                height={68}
                alt="arrow"
              />
              <h3 className="absolute right-8 bottom-16 text-[1.125rem] font-poppinsSemiBold">
                Our Project
              </h3>
            </div>
          </div>
        </div>
        <div className="sticky w-[38.75rem] h-[28.375rem] z-[6] pointer-events-none">
          <div className="sticky-entry z-[6]">
            <Image
              className="absolute"
              src="/heroExpert.svg"
              alt="heroexpert"
              sizes="38.75rem"
              fill
              style={{ objectFit: "contain" }}
            />
          </div>
        </div>
      </div>
      <div className="marquee-header relative flex left-[50%] right-[50%] h-[10.85dvh] ml-[-50dvw] mr-[-50dvw] bg-blue-400 z-10">
        <div className="RT1 w-64 content-center font-manropeRegular">
          <p className="my-8 w-[10.9rem] ml-8 mr-[3.75rem] h-[2.5rem] text-xs text-black leading-snug">
            Leading in the Business World: Our Clients
          </p>
        </div>
        <div className="marquee my-8">
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
      <div className="header1 relative flex flex-col h-[1599px] text-white text-[18.7px] bg-[#0D100D] z-10 w-[95%]">
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
        <div className="sticky-hero-end relative flex justify-center slider mx-auto h-[1599px]">
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
            <Image
              src="/arrow-narrow-right-down.svg"
              alt="arrow narrow"
              width={26}
              height={26}
            />
          </a>
        </div>
      </div>
    </header>
  );
}
