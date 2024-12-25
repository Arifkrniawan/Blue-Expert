"use client";
// import useScrollAnimationStore from "../state/ScrollStore";
import Image from "next/image";
import { useEffect, useRef } from "react";
import React from "react";
import gsap from "gsap";
import { Observer } from "gsap/Observer";
import { useGSAP } from "@gsap/react";
import { split } from "postcss/lib/list";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

export default function Home() {
  const triggerRef = useRef<HTMLDivElement>(null);
  // const setTriggerRef = useScrollAnimationStore((state)=> state.setTriggerRef)

  useGSAP(() => {
    gsap.registerPlugin(Observer);

    interface HorizontalLoopConfig {
      x?: string;
      repeat?: number;
      paused?: boolean;
      speed?: number;
      snap?: number | boolean;
      paddingRight?: number;
      reversed?: boolean;
      ease?: string;
      duration?: number;
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
        paused: true,
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
      const startX = items[0].offsetLeft - 32;
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

    // Usage
    const footerOnEnter = document.querySelector(".footer");

    const scrollingText = gsap.utils.toArray(
      ".marquee-footer-content li"
    ) as HTMLElement[];

    const tl1 = gsap.timeline({
      paused: true,
    });


    tl1.fromTo(
      footerOnEnter,
      {
        width: "95%",
        borderTopLeftRadius: "4rem",
        borderTopRightRadius: "4rem",
      },
      {
        width: "100%",
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        duration: 1,
      }
    );

    const tl = horizontalLoop(scrollingText, {
      repeat: -1,
      ease: "power2.inOut",
      speed: 1,
    });

    const tl2 = horizontalLoop(scrollingText, {
      speed: 0.3,
      ease: "power2.inOut",
    })
      .duration(2)
      .to(scrollingText, {
        speed: 1.5,
        ease: "power2.inOut",
      });

    footerOnEnter?.addEventListener("mouseenter", () => {
      tl1.play();
      tl.play();
      tl2.play();
    });

    footerOnEnter?.addEventListener("mouseleave", () => {
      tl1.reverse();
      tl.pause();
    });

    const tlWeb = gsap.timeline({
      paused: true
    })

    
  }, []);

  return (
    <main className="relative flex flex-col bg-inherit overflow-hidden">
      <section className="relative grid grid-col-1 grid-row-2 bg-white z-10 justify-center w-full mx-auto">
        <div className="row-start-1 row-end-1 flex flex-col justify-center items-center mt-[7.5rem] mx-auto">
          <p className="text-center text-blue-500 text-base">Services</p>
          <h2 className="text-center text-[3.5rem] font-bold font-lota mt-3">
            Elevate With Our Features!
          </h2>
          <p className="text-center font-manropeRegular text-[1.169rem] text-gray-600 w-[48rem] mt-5 mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
        <div className="flex cotainer-card row-start-2 row-end-2 gap-x-6 col-start-1 justify-center items-center mt-20 mb-[15.75rem] w-[95%] mx-auto">
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
          className="absolute bottom-[7%] left-[5%]"
          src="feature-bg-blue.svg"
          alt="bg"
          width={800}
          height={700}
        />
        <Image
          className="absolute bottom-[7%] right-[5%]"
          src="feature-bg-pink.svg"
          alt="bg"
          width={1000}
          height={800}
        />
      </section>
      <section className="footer relative flex flex-col text-white w-[95%] mx-auto overflow-hidden">
        <div className="relative mx-auto grid grid-rows-1 grid-cols-1 items-center justify-items-center w-[90dvw]">
          <div className="sticky-image -top-[16rem] w-[38.75rem] h-[28.375rem] col-start-1 col-end-1 z-[7]">
            <div className="sticky-entry z-[7]">
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
          <div className="relative flex flex-col footer-head items-center justify-center w-[100%] mt-36 z-[11]">
            <div className="relative content-span overflow-hidden">
              <span>
                <p className="text-center text-blue-500 text-base">Team</p>
              </span>
            </div>
            <div className="relative content-span mt-3 overflow-hidden">
              <span>
                <h2 className="text-center text-[3.5rem] font-bold w-[48rem]">
                  Meet Out Team
                </h2>
              </span>
            </div>
            <div className="relative content-span mt-5 overflow-hidden">
              <span>
                <p className="flex items-center justify-center w-[48rem] text-center text-lg">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Vivamus a lorem id justo mollis congue. Proin malesuada at ex
                  vel pellentesque. Cras eget tellus ligula.
                </p>
              </span>
            </div>
          </div>
          <div className="flex relative sticky-hero-end1 marquee-footer w-dvw overflow-x-hidden justify-center items-center z-[11]">
            <div className="flex relative min-h-[19.75rem] w-dvw mt-[25rem] mb-[14rem]">
              <ul className="relative flex items-center space-x-8 w-dvw min-h-[19.75rem] marquee-footer-content z-[12] overflow-x-hidden">
                <li className="flex relative">
                  <div className="flex relative flex-start rounded-[1.25rem] w-[17.5rem] p-6 card">
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
                        Former co-founder of Opendoor. Early staff at Spotify
                        and Clearbit.
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
                <li className="flex relative">
                  <div className="flex flex-col flex-start rounded-[1.25rem] w-[17.5rem] p-6 card">
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
                        Former co-founder of Opendoor. Early staff at Spotify
                        and Clearbit.
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
                <li className="flex relative">
                  <div className="flex flex-col flex-start rounded-[1.25rem] w-[17.5rem] p-6 card">
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
                        Former co-founder of Opendoor. Early staff at Spotify
                        and Clearbit.
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
                <li className="flex relative">
                  <div className="flex flex-col flex-start rounded-[1.25rem]  w-[17.5rem] p-6 card">
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
                        Former co-founder of Opendoor. Early staff at Spotify
                        and Clearbit.
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
                <li className="flex relative">
                  <div className="flex flex-col flex-start rounded-[1.25rem]  w-[17.5rem] p-6 card">
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
                        Former co-founder of Opendoor. Early staff at Spotify
                        and Clearbit.
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
                <li className="flex relative">
                  <div className="flex flex-col flex-start rounded-[1.25rem]  w-[17.5rem] p-6 card">
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
                        Former co-founder of Opendoor. Early staff at Spotify
                        and Clearbit.
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
                <li className="flex relative">
                  <div className="flex flex-col flex-start rounded-[1.25rem]  w-[17.5rem] p-6 card">
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
                        Former co-founder of Opendoor. Early staff at Spotify
                        and Clearbit.
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
                <li className="flex relative">
                  <div className="flex flex-col flex-start rounded-[1.25rem]  w-[17.5rem] p-6 card">
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
                        Former co-founder of Opendoor. Early staff at Spotify
                        and Clearbit.
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
                <li className="flex relative">
                  <div className="flex flex-col flex-start rounded-[1.25rem]  w-[17.5rem] p-6 card">
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
                        Former co-founder of Opendoor. Early staff at Spotify
                        and Clearbit.
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
                <li className="flex relative">
                  <div className="flex flex-col flex-start rounded-[1.25rem]  w-[17.5rem] p-6 card">
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
                        Former co-founder of Opendoor. Early staff at Spotify
                        and Clearbit.
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
          </div>
        </div>
      </section>
    </main>
  );
}
