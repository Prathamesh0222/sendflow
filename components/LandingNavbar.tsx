"use client";

import { CreditCard } from "lucide-react";
import { Button } from "./ui/button";
import { ModeToggle } from "./mode-toggle";
import { motion } from "framer-motion";

export const LandingNavbar = () => {
  return (
    <motion.nav
      initial={{ y: -50, opacity: 0, filter: "blur(10px)" }}
      animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
      transition={{
        duration: 0.8,
        delay: 0.2,
        type: "spring",
        stiffness: 100,
      }}
    >
      <div className="p-4">
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <div className="-rotate-45">
              <CreditCard size={32} className="text-blue-800" />
            </div>
            <h1 className="text-xl font-bold">SendFlow</h1>
          </div>
          <div className="flex space-x-3 items-center">
            <ModeToggle />
            <Button>Login</Button>
            <Button>Register</Button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};
