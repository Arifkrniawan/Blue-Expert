"use client";

import { Inter } from "next/font/google";
import { ReactLenis } from "lenis/react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import "./globals.css";
import Navbar from "./navbar";
import Header from "./header";

const inter = Inter({ subsets: ["latin"] });

type LenisInstanceType = {
  lenis: any;
};

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<LenisInstanceType>(null);

  useGSAP(() => {
    let sections = gsap.utils.toArray<HTMLElement>(".sticky-image");
    const stickyNav = document.getElementsByTagName("nav");

    let tl = gsap.timeline();

    tl.fromTo(
      ".sticky-entry",
      { yPercent: 50, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 2 }
    )
      .fromTo(
        ".slide-up-50",
        { yPercent: 50, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 2, ease: "power2.out" },
        "<"
      )
      .fromTo(
        ".slide-up-100",
        { yPercent: 100, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 2, ease: "power2.out" },
        "<"
      )
      .fromTo(
        ".slide-up-101",
        { yPercent: 101, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 2, ease: "power2.out" },
        "<"
      )
      .to(
        ".slide-up-100.content-span",
        {
          clipPath: "inset(0px 0px 0px 0px)",
          duration: 2,
          ease: "power2.out",
        },
        "<"
      )
      .to(
        ".slide-up-101.content-span",
        {
          clipPath: "inset(0px 0px 0px 0px)",
          duration: 2,
          ease: "power2.out",
        },
        "<"
      );

    let mm = gsap.matchMedia();

    mm.add("(max-width: 1366px) and (max-height:768px)", () => {
      let isVisible = true;
      sections.forEach((section) => {
        ScrollTrigger.create({
          trigger: section,
          start: "top 17%",
          end: "+=670",
          pin: true,
          pinSpacing: false,
          onUpdate: (self) => {
            if (self.scroll() > 2500 && self.scroll() < 2700) {
              gsap.to(section, {
                opacity: 0,
                duration: 0,
              });
            } else {
              gsap.to(section, {
                opacity: 1,
                duration: 0,
              });
            }
          },
        });
      });
    });

    mm.add("(min-width:1399px)", () => {
      sections.forEach((section) => {
        ScrollTrigger.create({
          trigger: section,
          start: "top 17%",
          end: "+=670",
          pin: true,
          pinSpacing: false,
          onUpdate: (self) => {
            if (self.scroll() > 2700 && self.scroll() < 3300) {
              gsap.to(section, {
                opacity: 0,
                duration: 0,
              });
            } else {
              gsap.to(section, {
                opacity: 1,
                zIndex: -1,
                duration: 0,
              });
            }
          },
        });
      });
    });

    ScrollTrigger.create({
      trigger: stickyNav,
      start: "top top",
      end: "bottom bottom",
      endTrigger: "sticky-hero-end1",
      pin: stickyNav,
      pinSpacing: false,
    });

    function update(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }

    gsap.ticker.add(update);

    return () => gsap.ticker.remove(update);
    ScrollTrigger.getAll().forEach((t) => t.kill);
  }, []);

  return (
    <html lang="en">
      <body className={inter.className} style={{ minHeight: "100vh" }}>
        <ReactLenis
          ref={lenisRef as any}
          root
          options={{ lerp: 0.1, wheelMultiplier: 1 }}
        >
          <Navbar></Navbar>
          <Header></Header>
          {children}
        </ReactLenis>
      </body>
    </html>
  );
}
