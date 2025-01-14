"use client";

import useRecentTxn from "@/app/hooks/useRecentTxn";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useSession } from "next-auth/react";
const Home = () => {
  const { data: session } = useSession();
  const { transactions, loading } = useRecentTxn();

  if (loading) {
    return <div>loading...</div>;
  }

  if (!transactions) {
    return <div>No transactions found.</div>;
  }

  return (
    <div>
      <div className="p-8 border rounded-xl">
        <div>
          <span className="text-center font-bold">Your Balance</span>
        </div>
        <span className="text-2xl"> ₹ {session?.user.balance.toFixed(2)}</span>
      </div>
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card Description</CardDescription>
          </CardHeader>
          <CardContent>
            {transactions.map((transaction) => (
              <div className="flex" key={transaction.id}>
                <p>Amount: ${transaction.amount}</p>
                <p>Status: {transaction.status}</p>
                <p>Sender: {transaction.sender.username}</p>
                <p>Receiver: {transaction.receiver.username}</p>
                <p>Date: {new Date(transaction.timestamp).toLocaleString()}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Home;
