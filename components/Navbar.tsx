import { CreditCard } from "lucide-react";
import UserDropdown from "./UserDropdown";
import { ModeToggle } from "./mode-toggle";

const Navbar = () => {
  return (
    <div className="w-full border-b">
      <div className="mx-auto flex justify-between  p-4">
        <div className="flex items-center gap-2">
          <div className="-rotate-45">
            <CreditCard size={32} className="text-blue-800" />
          </div>
          <h1 className="text-xl font-bold">SendFlow</h1>
        </div>
        <div className="items-center space-x-4 mr-4">
          <ModeToggle />
          <UserDropdown />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
