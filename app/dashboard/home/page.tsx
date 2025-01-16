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

  const labels = transactions.map((txn) =>
    new Date(txn.timestamp).toLocaleDateString()
  );

  const sentAmounts = Array(labels.length).fill(0);
  const receivedAmounts = Array(labels.length).fill(0);

  transactions.forEach((txn, index) => {
    if (txn.sender.email === session?.user.email) {
      sentAmounts[index] = txn.amount;
    }
    if (txn.receiver.email === session?.user.email) {
      receivedAmounts[index] = txn.amount;
    }
  });
  const chartData = {
    labels: labels,
    sentAmount: sentAmounts,
    receivedAmount: receivedAmounts,
  };

  const totalMoneyDeducted = transactions
    .filter((txn) => txn.sender.email === session?.user.email)
    .reduce((total, txn) => total + txn.amount, 0);

  const totalMoneyIncremented = transactions
    .filter((txn) => txn.receiver.email === session?.user.email)
    .reduce((total, txn) => total + txn.amount, 0);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
            {totalMoneyDeducted > 0
              ? "- ₹" + totalMoneyDeducted.toFixed(2)
              : "₹" + totalMoneyDeducted.toFixed(2)}
          </span>
        </div>
        <div className="p-8 border rounded-xl">
          <div>
            <span className="text-center font-bold">Total Money Received</span>
          </div>
          <span className="text-2xl dark:text-green-500 text-green-700">
            {" "}
            {totalMoneyIncremented > 0
              ? "+ ₹" + totalMoneyIncremented.toFixed(2)
              : "₹" + totalMoneyIncremented.toFixed(2)}
          </span>
        </div>
        <div className="md:col-span-3 lg:col-span-1">
          <Card>
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
        <Card className="md:w-[752px] lg:w-[980px] w-[550px]">
          <CardHeader className="text-2xl font-semibold">Data Graph</CardHeader>
          <CardContent className="flex flex-col justify-center">
            <div>
              <TransactionChart data={chartData} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Home;
