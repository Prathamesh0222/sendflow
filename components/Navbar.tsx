import { CreditCard, User } from "lucide-react";
import UserDropdown from "./UserDropdown";

const Navbar = () => {
  return (
    <div className="w-full">
      <div className="flex justify-between border-b p-4">
        <div className="flex items-center gap-2">
          <div className="-rotate-45">
            <CreditCard size={32} className="text-blue-800" />
          </div>
          <h1 className="text-xl font-bold">SendFlow</h1>
        </div>
        <UserDropdown />
      </div>
    </div>
  );
};

export default Navbar;
