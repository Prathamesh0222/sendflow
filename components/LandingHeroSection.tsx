"use client";

import { MouseIcon } from "lucide-react";
import { LandingImage } from "./LandingImage";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export const LandingHeroSection = () => {
  const router = useRouter();
  return (
    <motion.div
      initial={{ y: 50, opacity: 0, filter: "blur(10px)" }}
      animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
      transition={{
        duration: 0.9,
        delay: 0.2,
        type: "spring",
        stiffness: 75,
        damping: 10,
      }}
    >
      <motion.div
        initial={{ y: 50, opacity: 0, filter: "blur(10px)" }}
        animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
        transition={{
          duration: 0.8,
          delay: 0.3,
          type: "spring",
          stiffness: 75,
          damping: 10,
        }}
        className="flex-grow justify-center text-center"
      >
        <h1 className="text-6xl md:text-7xl mt-28 font-semibold line-clamp-3 tracking-tight">
          Welcome to{" "}
          <span className="text-blue-500 underline underline-offset-8">
            {" "}
            SendFlow
          </span>
        </h1>
        <p className="text-muted-foreground mt-2 md:mx-auto mx-10">
          Your gateway to seamless peer-to-peer transactions and real-time
          financial insights, all in one place.
        </p>
        <div className="space-x-3 mt-4">
          <Button
            onClick={() => {
              router.push("/api/signup");
            }}
            className="bg-blue-500 text-white"
          >
            Get Started
          </Button>
        </div>
      </motion.div>
      <div className="flex justify-center object-cover mt-10">
        <LandingImage />
      </div>
      <div className="flex justify-center mt-12 animate-bounce">
        <MouseIcon />
      </div>
    </motion.div>
  );
};
