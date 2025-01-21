"use client";

import { MoveRight } from "lucide-react";
import { Button } from "./ui/button";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useRouter } from "next/navigation";

export const LandingEnd = () => {
  const endRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(endRef, { once: true });
  const router = useRouter();
  return (
    <motion.section
      ref={endRef}
      initial={{ y: 50, opacity: 0, filter: "blur(10px)" }}
      animate={
        isInView
          ? { y: 0, opacity: 1, filter: "blur(0px)" }
          : { y: 50, opacity: 0, filter: "blur(10px)" }
      }
      transition={{
        duration: 0.9,
        delay: 0.2,
        type: "spring",
        stiffness: 75,
        damping: 10,
      }}
    >
      <div className="text-center border-t mt-12">
        <h1 className="text-4xl mt-12 mb-2">Ready to Experience SendFlow</h1>
        <p className="text-lg mt-2   mb-4">
          Join thousands of users who trust SendFlow for their daily
          transactions.
          <br /> Start sending money instantly today.
        </p>
        <Button onClick={() => router.push("/api/signin")} className="mb-10">
          Get Started Now{" "}
          <span>
            <MoveRight />
          </span>
        </Button>
      </div>
    </motion.section>
  );
};
