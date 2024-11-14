import { authOptions } from "@/app/lib/auth";
import { getServerSession } from "next-auth";
const Home = async () => {
  const session = await getServerSession(authOptions);

  return <div>{session?.user.balance}</div>;
};

export default Home;
