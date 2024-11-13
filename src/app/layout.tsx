"use client";

import { Inter } from "next/font/google";
import { ReactLenis } from 'lenis/react';
import gsap from 'gsap';
import { useEffect, useRef } from 'react';
import "./globals.css";
import Navbar from "./navbar";
import Header from "./header";

const inter = Inter({ subsets: ["latin"] });

type LenisInstanceType = {
  lenis: any 
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<LenisInstanceType>(null)
  
  useEffect(() => {
    function update(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000)
    }
  
    gsap.ticker.add(update)
  
    return () => gsap.ticker.remove(update)
  }, [])

  return (
    <html lang="en">
      <body className={inter.className} style={{minHeight:'100vh'}}>
        <ReactLenis ref={lenisRef as any} root options={{ lerp: 0.1, wheelMultiplier: 1 }}>
        <Navbar></Navbar>
        <Header></Header>
        {children}
        </ReactLenis>
      </body>
    </html>
  );
}
