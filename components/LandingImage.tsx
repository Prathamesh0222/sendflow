"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useState } from "react";

export const LandingImage = () => {
  const { theme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  });

  if (!isMounted) {
    return (
      <Image
        className="relative border rounded-xl shadow-xl"
        src={"/landing_page.jpg"}
        alt=""
        width={1000}
        height={1000}
      />
    );
  }

  return (
    <Image
      className="relative border rounded-xl shadow-xl"
      src={
        theme === "dark" ? "/landing_page_dark_mode.jpg" : "/landing_page.jpg"
      }
      alt=""
      width={1000}
      height={1000}
    />
  );
};
