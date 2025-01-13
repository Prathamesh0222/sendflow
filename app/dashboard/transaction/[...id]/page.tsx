"use client";

import { useSearchParams } from "next/navigation";

const Transactions = () => {
  const searchParams = useSearchParams();
  searchParams.get("senderId");

  return <div>Hi There</div>;
};

export default Transactions;
