"use client";

import { useState } from "react";
import {
  ArrowLeftRight,
  HelpCircle,
  Home,
  Settings,
  SquareChevronLeft,
  SquareChevronRight,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface IconProps {
  name: string;
  icon: JSX.Element;
  link: string;
}

const Icons: IconProps[] = [
  {
    name: "Home",
    icon: <Home />,
    link: "/dashboard/home",
  },
  {
    name: "Settings",
    icon: <Settings />,
    link: "/dashboard/settings",
  },
  {
    name: "P2P Transactions",
    icon: <ArrowLeftRight />,
    link: "/dashboard/transaction",
  },
];

const Sidebar = () => {
  const session = useSession();
  const pathname = usePathname();
  const [expanded, setExpanded] = useState(false);

  const toggleSidebar = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="flex h-screen">
      <div
        className={`border-r transition-all duration-300 ease-in-out transform ${
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
            <div className="p-3 border-t flex gap-4 items-center">
              <div>
                <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                  <svg
                    className="absolute w-12 h-12 text-gray-400 -left-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>
              </div>
              <div className="font-bold">
                {session.data?.user.username}
                <br />
                {session.data?.user.email}
              </div>
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
  );
};

export default Sidebar;
