import { MouseIcon } from "lucide-react";
import { LandingImage } from "./LandingImage";
import { Button } from "./ui/button";

export const LandingHeroSection = () => {
  return (
    <div>
      <div className="flex-grow justify-center text-center">
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
          <Button className="bg-blue-500 text-white">Get Started</Button>
        </div>
      </div>
      <div className="flex justify-center object-cover mt-10">
        <LandingImage />
      </div>
      <div className="flex justify-center mt-12 animate-bounce">
        <MouseIcon />
      </div>
    </div>
  );
};
