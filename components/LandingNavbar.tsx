import { CreditCard } from "lucide-react";
import { Button } from "./ui/button";
import { ModeToggle } from "./mode-toggle";

export const LandingNavbar = () => {
  return (
    <div className="p-4">
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <div className="-rotate-45">
            <CreditCard size={32} className="text-blue-800" />
          </div>
          <h1 className="text-xl font-bold">SendFlow</h1>
        </div>
        <div className="space-x-3 items-center">
          <ModeToggle />
          <Button>Login</Button>
          <Button>Register</Button>
        </div>
      </div>
    </div>
  );
};
