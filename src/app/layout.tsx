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
    let sections = gsap.utils.toArray<HTMLElement>(".sticky");

      let tl = gsap.timeline();

      tl.fromTo(
        ".sticky-entry",
        { yPercent: 50, opacity: 0} ,
        { yPercent: 0, opacity: 1, duration: 2}
      )
      .fromTo(".slide-up-50", {yPercent: 50, opacity: 0}, {yPercent: 0, opacity: 1, duration:2, ease: "power2.out"},"<")
      .fromTo(".slide-up-100", {yPercent: 100, opacity: 0}, {yPercent: 0, opacity: 1, duration:2, ease: "power2.out"},"<")
      .fromTo(".slide-up-101", {yPercent: 101, opacity: 0}, {yPercent: 0, opacity: 1, duration:2, ease: "power2.out"},"<")
      .to('.slide-up-100.content-span', {
        clipPath : "inset(0px 0px 0px 0px)",
        duration: 2,
        ease: 'power2.out'
      },'<')
      .to('.slide-up-101.content-span', {
        clipPath : "inset(0px 0px 0px 0px)",
        duration: 2,
        ease: 'power2.out'
      },'<')


    sections.forEach((section) => {
      ScrollTrigger.create({
        trigger: section,
        start: "top 17%",
        end: "+=670",
        pin: true,
        markers: true,
        pinSpacing: false,
      });
    });

    function update(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }

    gsap.ticker.add(update);

    return () => gsap.ticker.remove(update)
    ScrollTrigger.getAll().forEach(t=> t.kill);
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
