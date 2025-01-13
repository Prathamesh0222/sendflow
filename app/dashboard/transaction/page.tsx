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
import { useSession } from "next-auth/react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const Transactions = () => {
  interface UserProps {
    email: string;
    username: string;
  }

  const [users, setUsers] = useState<UserProps[]>([]);
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
                    <div className=" rounded-full w-12 h-12 flex justify-center items-center bg-blue-800">
                      {user.username}
                    </div>
                  </TableCell>
                  <TableCell className="px-6 py-4 whitespace-nowrap">
                    {user.email}
                  </TableCell>
                  <TableCell className="px-6 py-4 whitespace-nowrap">
                    {user.username}
                  </TableCell>
                  <TableCell className="px-6 py-4 whitespace-nowrap text-right">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="bg-blue-800 text-white hover:bg-blue-950">
                          <Send />
                          Send Money
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <div className="flex justify-center">
                            <div className="text-5xl rounded-full border w-28 h-28 items-center justify-center flex">
                              {session.data?.user.username}
                            </div>
                          </div>
                          <DialogTitle>
                            {session.data?.user.username}
                          </DialogTitle>
                          <DialogDescription>
                            {session.data?.user.email}
                          </DialogDescription>
                        </DialogHeader>
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
