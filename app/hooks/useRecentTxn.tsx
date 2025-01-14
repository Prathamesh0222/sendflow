"use client";

import axios from "axios";
import { useEffect, useState } from "react";

interface Transaction {
  id: string;
  amount: number;
  status: string;
  timestamp: string;
  sender: { username: string; email: string };
  receiver: { username: string; email: string };
}

export default function () {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get("/api/recentTransaction");
        if (response.status === 200) {
          setTransactions(response.data.recentTransaction || []);
        }
      } catch (error) {
        console.error("Failed to fetch transactions", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTransactions();
  }, []);

  return { transactions, loading };
}
