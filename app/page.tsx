import { LandingFooter } from "@/components/LandingFooter";
import { LandingNavbar } from "@/components/LandingNavbar";
import { Button } from "@/components/ui/button";

export default function Home() {
  const features = [
    {
      title: "Instant Transfers",
      description: "Send and receive money instantly with just a few clicks.",
    },
    {
      title: "Financial Insights",
      description:
        "Track your spending patterns and gain valuable insights with interactive visualizations",
    },
    {
      title: "User Profiles",
      description:
        "Manage your profile and easily connect with your transaction partners",
    },
  ];

  return (
    <main className="max-w-7xl mx-auto min-h-screen flex flex-col">
      <LandingNavbar />
      <div className="flex-grow justify-center text-center">
        <h1 className="text-7xl mt-32 font-semibold">Welcome to SendFlow</h1>
        <p className="text-muted-foreground">
          Your gateway to seamless peer-to-peer transactions and real-time
          financial insights, all in one place.
        </p>
        <div className="space-x-3 mt-4">
          <Button>Get Started</Button>
          <Button>Features</Button>
        </div>
      </div>
      <div>
        <h2 className="text-3xl text-center mt-12">
          Why choose <span className="text-blue-500">Sendflow?</span>
        </h2>
      </div>
      <div className=""></div>
      <LandingFooter />
    </main>
  );
}
