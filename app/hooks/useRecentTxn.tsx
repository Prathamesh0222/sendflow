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
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const limit = 5;

  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `/api/recentTransaction?page=${page}&limit=${limit}`
        );
        console.log(response.data);
        if (response.status === 200) {
          setTransactions(response.data.recentTransaction || []);
          setTotalPages(response.data.pagination?.totalPages || 1);
        }
      } catch (error) {
        console.error("Failed to fetch transactions", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTransactions();
  }, [page]);

  const handlePageNext = () => {
    if (page < totalPages) {
      setPage((next) => next + 1);
    }
  };

  const handlePagePrev = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  return {
    transactions,
    loading,
    page,
    totalPages,
    handlePageNext,
    handlePagePrev,
  };
}
