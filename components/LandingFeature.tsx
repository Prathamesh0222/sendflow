import {
  BarChart,
  CreditCard,
  Library,
  MonitorSmartphone,
  Percent,
  User,
} from "lucide-react";

export const features = [
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
  {
    title: "User-Centric Design",
    description:
      "A clean, intuitive interface designed for both beginners and advanced users.",
    icon: <MonitorSmartphone />,
  },
];

export const LandingFeature = () => {
  return (
    <section>
      <div>
        <h2 className="text-3xl text-center mt-20 mb-12">
          Why choose <span className="text-blue-500">Sendflow?</span>
        </h2>
      </div>
      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
        {features.map((feature, idx) => (
          <div key={idx} className="border p-4 rounded-lg">
            <div className="text-blue-500 mb-3">{feature.icon}</div>
            <div className="text-xl font-bold mb-2">{feature.title}</div>
            <div>{feature.description}</div>
          </div>
        ))}
      </div>
    </section>
  );
};
