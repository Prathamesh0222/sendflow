import { authOptions } from "@/app/lib/auth";
import { getServerSession } from "next-auth";
const Home = async () => {
  const session = await getServerSession(authOptions);
  console.log(session);
  const formattedBalance = session?.user.balance;

  return <div>
    <div className="p-8 border border-white rounded-xl w-1/4">
      <div>
        <span className="font-bold">Your Balance</span>
      </div>
      <span className="text-4xl">₹{formattedBalance}</span>
    </div>
  </div>;
};
export default Home;
