"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Send } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { PaymentDoneCheck } from "@/components/paymentDoneCheck";
const Transactions = () => {
  interface UserProps {
    id: string;
    email: string;
    username: string;
  }

  const [users, setUsers] = useState<UserProps[]>([]);
  const [receiverId, setReceiverId] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [selectedUser, setSelectedUser] = useState<UserProps | null>(null);
  const [transactionStatus, setTransactionStatus] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 5;
  const session = useSession();

  const fetchUsers = async (page: number) => {
    const response = await axios.get(`/api/user?page=${page}&limit=${limit}`);
    if (response.status === 200) {
      const { users, totalPages } = response.data;
      setUsers(users);
      setTotalPages(totalPages);
    } else {
      console.error("Error in fetching users", response);
    }
  };

  const sendMoney = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post("/api/transaction", {
        senderId: session.data?.user.id,
        receiverId,
        amount: parseFloat(amount),
      });
      if (response.status === 200) {
        setTransactionStatus(true);
        toast.success("Transaction successful");
        setTimeout(() => {
          setIsDialogOpen(false);
          setTransactionStatus(false);
        }, 2000);
      }
    } catch (error) {
      console.error("Transaction Failed", error);
      toast.error("Transaction Failed");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(page);
  }, [page]);

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="overflow-x-auto">
        <div className="min-w-full border rounded-xl shadow-md ">
          <Table className="min-w-full rounded-xl">
            <TableHeader>
              <TableRow>
                <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Number
                </TableHead>
                <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </TableHead>
                <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Username
                </TableHead>
                <TableHead className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Send Button
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user, index) => (
                <TableRow key={index}>
                  <TableCell className="px-6 py-4 whitespace-nowrap">
                    <div className=" rounded-full w-12 h-12 flex justify-center items-center border">
                      {user.username[0]}
                    </div>
                  </TableCell>
                  <TableCell className="px-6 py-4 whitespace-nowrap">
                    {user.email}
                  </TableCell>
                  <TableCell className="px-6 py-4 whitespace-nowrap">
                    {user.username}
                  </TableCell>
                  <TableCell className="px-6 py-4 whitespace-nowrap text-right">
                    <Button
                      onClick={() => {
                        setSelectedUser(user);
                        setReceiverId(user.id);
                        setIsDialogOpen(true);
                      }}
                      className="bg-blue-800 text-white hover:bg-blue-950"
                    >
                      <Send />
                      Send Money
                    </Button>
                    <Dialog
                      open={isDialogOpen}
                      onOpenChange={(open) => {
                        setIsDialogOpen(open);
                        if (!open) {
                          setSelectedUser(null);
                          setAmount("");
                        }
                      }}
                    >
                      <DialogTrigger asChild></DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <div className="flex justify-center">
                            <div className="text-5xl rounded-full border w-28 h-28 items-center justify-center flex">
                              {selectedUser?.username[0]}
                            </div>
                          </div>
                          <DialogTitle>{selectedUser?.username}</DialogTitle>
                          <DialogDescription>
                            {selectedUser?.email}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-3">
                          <Input
                            placeholder="Enter amount"
                            value={amount}
                            onChange={(e) => {
                              setAmount(e.target.value);
                            }}
                            disabled={isLoading}
                          />
                          <Button
                            onClick={sendMoney}
                            disabled={isLoading}
                            className="w-full"
                          >
                            {isLoading ? "Sending..." : "Send Money"}
                          </Button>
                        </div>
                        {transactionStatus && <PaymentDoneCheck />}
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      <div className="flex justify-between items-center mt-4">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                className="border cursor-pointer hover:bg-blue-800"
                onClick={handlePrevPage}
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink className="border cursor-pointer hover:bg-blue-800">
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                className="border cursor-pointer hover:bg-blue-800"
                onClick={handleNextPage}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default Transactions;
