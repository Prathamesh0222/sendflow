"use client";

import useRecentTxn from "@/app/hooks/useRecentTxn";
import TransactionChart from "@/components/chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronDown, ChevronUp } from "lucide-react";
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

  const chartData = {
    labels: transactions.map((txn) =>
      new Date(txn.timestamp).toLocaleDateString()
    ),
    amounts: transactions.map((txn) => txn.amount),
  };

  const totalMoneyDeducted = transactions
    .filter((txn) => txn.sender.email === session?.user.email)
    .reduce((total, txn) => total + txn.amount, 0);

  const totalMoneyIncremented = transactions
    .filter((txn) => txn.receiver.email === session?.user.email)
    .reduce((total, txn) => total + txn.amount, 0);

  return (
    <div className="space-y-4">
      <div className="flex gap-8 w-full">
        <div className="p-8 border rounded-xl">
          <div>
            <span className="text-center font-bold">Your Balance</span>
          </div>
          <span className="text-2xl">
            {" "}
            ₹ {session?.user.balance.toFixed(2)}
          </span>
        </div>
        <div className="p-8 border rounded-xl">
          <div>
            <span className="text-center font-bold">Total Money Deducted</span>
          </div>
          <span className="text-2xl dark:text-red-500 text-red-700">
            {" "}
            - ₹ {totalMoneyDeducted.toFixed(2)}
          </span>
        </div>
        <div className="p-8 border rounded-xl">
          <div>
            <span className="text-center font-bold">Total Money Received</span>
          </div>
          <span className="text-2xl dark:text-green-500 text-green-700">
            {" "}
            + ₹ {totalMoneyIncremented.toFixed(2)}
          </span>
        </div>
      </div>
      <div>
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            {transactions.map((transaction) => {
              const isReceived =
                transaction.receiver.email === session?.user.email;
              return (
                <div
                  className="flex justify-between items-center border-b p-4"
                  key={transaction.id}
                >
                  <div>
                    <p className="text-lg font-semibold">
                      {isReceived
                        ? `Received from: ${transaction.sender.username}`
                        : `Sent to: ${transaction.receiver.username}`}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {transaction.status}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(transaction.timestamp).toLocaleString()}
                    </p>
                  </div>
                  {isReceived ? (
                    <div className="flex items-center gap-2 text-green-500">
                      <p>+ ₹{transaction.amount}</p>
                      <span>
                        <ChevronUp size={15} />
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-red-500">
                      <p>- ₹{transaction.amount}</p>
                      <span>
                        <ChevronDown size={15} />
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardContent>
          <TransactionChart data={chartData} />
        </CardContent>
      </Card>
    </div>
  );
};

export default Home;
