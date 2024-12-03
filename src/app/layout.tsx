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
import { transform } from "next/dist/build/swc";

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

    gsap.from(
      ".sticky-entry",
      { yPercent: 50, opacity: 0 }
    );

    sections.forEach((section) => {
      ScrollTrigger.create({
        trigger: section,
        start: "clamp(top 17%)",
        end: "+=800",
        pin: true,
        markers: true,
        pinSpacing: false,
      });
    });

    // ScrollTrigger.create({
    //   trigger: ".footer",
    //   start: "top center",
    //   end: "20% center",
    //   pin: true,
    //   markers:true,
    //   id: "footer"
    // })

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
