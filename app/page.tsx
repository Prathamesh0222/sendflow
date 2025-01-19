import { LandingFooter } from "@/components/LandingFooter";
import { LandingNavbar } from "@/components/LandingNavbar";
import { Button } from "@/components/ui/button";
import { BarChart, CreditCard, Library, Percent, User } from "lucide-react";
import Image from "next/image";

export default function Home() {
  const features = [
    {
      title: "Instant Transfers",
      description: "Send and receive money instantly with just a few clicks.",
      icon: <CreditCard />,
    },
    {
      title: "Financial Insights",
      description:
        "Track your spending patterns and gain valuable insights with interactive visualizations",
      icon: <BarChart />,
    },
    {
      title: "User Profiles",
      description:
        "Manage your profile and easily connect with your transaction partners",
      icon: <User />,
    },
    {
      title: "Recent Transactions",
      description:
        "View a detailed list of your most recent transactions, including dates, amounts, and recipient/sender details.",
      icon: <Percent />,
    },
    {
      title: "Detailed Records",
      description:
        "Access a complete history of all your transactions, including timestamps, transaction IDs, and participant details.",
      icon: <Library />,
    },
  ];

  return (
    <main className="max-w-7xl mx-auto min-h-screen flex flex-col">
      <LandingNavbar />
      <div className="flex-grow justify-center text-center">
        <h1 className="text-7xl mt-36 font-semibold line-clamp-3 tracking-tight">
          Welcome to{" "}
          <span className="text-blue-500 underline underline-offset-8">
            {" "}
            SendFlow
          </span>
        </h1>
        <p className="text-muted-foreground mt-2">
          Your gateway to seamless peer-to-peer transactions and real-time
          financial insights, all in one place.
        </p>
        <div className="space-x-3 mt-4">
          <Button className="bg-blue-500 text-white">Get Started</Button>
          <Button variant={"outline"}>Features</Button>
        </div>
      </div>
      <div className="flex justify-center object-cover mt-10">
        <Image
          className="border rounded-xl shadow-xl"
          src={"/landing_page.jpg"}
          alt=""
          width={1000}
          height={1000}
        />
      </div>
      <div>
        <h2 className="text-3xl text-center my-12">
          Why choose <span className="text-blue-500">Sendflow?</span>
        </h2>
      </div>
      <div className="flex gap-3">
        {features.map((feature, idx) => (
          <div key={idx} className="border p-4 rounded-lg">
            <div className="text-blue-500 mb-3">{feature.icon}</div>
            <div className="text-xl font-bold mb-2">{feature.title}</div>
            <div>{feature.description}</div>
          </div>
        ))}
      </div>
      <LandingFooter />
    </main>
  );
}
