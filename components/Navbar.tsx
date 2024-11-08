import { User } from "lucide-react";

const Navbar = () => {
  return (
    <div className="w-full">
      <div className="flex justify-between border p-4">
        <div>Hi There</div>
        <div>
          <User />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
