"use client";

import { useState } from "react";
import {
  ArrowLeftRight,
  LayoutDashboard,
  SquareChevronLeft,
  SquareChevronRight,
} from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface IconProps {
  name: string;
  icon: JSX.Element;
  link: string;
}

const Icons: IconProps[] = [
  {
    name: "Dashboard",
    icon: <LayoutDashboard />,
    link: "/dashboard/home",
  },
  {
    name: "P2P Transactions",
    icon: <ArrowLeftRight />,
    link: "/dashboard/transaction",
  },
];

const Sidebar = () => {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState(false);

  const toggleSidebar = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <div className="hidden lg:flex min-h-screen">
        <div
          className={`border-r hidden lg:block transition-all duration-300 ease-in-out transform ${
            expanded ? "translate-x-0 w-64" : "translate-x-0 w-18"
          }`}
        >
          {expanded ? (
            <div className="flex flex-col justify-between h-full">
              <div>
                <div className="p-3 mt-2 flex">
                  <SquareChevronLeft
                    size={42}
                    className="cursor-pointer hover:bg-blue-800 p-2 rounded-lg"
                    onClick={toggleSidebar}
                  />
                </div>
                {Icons.map((icon, index) => (
                  <div key={index}>
                    <Link href={icon.link}>
                      <div
                        className={`flex items-center p-4 mt-4 rounded-xl mx-2
                    ${
                      pathname === icon.link
                        ? "bg-blue-800 text-white"
                        : "hover:bg-blue-800"
                    }
                    `}
                      >
                        {icon.icon}
                        <span className="ml-4">{icon.name}</span>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <div className="p-3 mt-2 flex justify-end">
                <SquareChevronRight
                  size={42}
                  className="cursor-pointer hover:bg-blue-800 p-2 rounded-lg"
                  onClick={toggleSidebar}
                />
              </div>
              {Icons.map((icon, index) => (
                <div key={index}>
                  <Link
                    href={icon.link}
                    className={`flex justify-end p-5 mt-4 ${
                      pathname === icon.link
                        ? "bg-blue-800 text-white rounded-xl"
                        : "hover:bg-blue-800"
                    }`}
                  >
                    {icon.icon}
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="lg:hidden fixed p-4 bottom-0 left-0 right-0 bg-background border-t">
        <div className="flex gap-2 mx-24 justify-between">
          {Icons.map((icon, index) => (
            <div key={index}>
              <Link href={icon.link}>
                <div
                  className={`flex gap-2 p-2.5 rounded-lg w-full ${
                    pathname === icon.link
                      ? "bg-blue-800 text-white"
                      : "bg-background hover:bg-blue-800"
                  }`}
                >
                  {icon.icon}{" "}
                  <span className="hidden md:inline">{icon.name}</span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
