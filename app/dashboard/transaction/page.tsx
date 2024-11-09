"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import { useEffect, useState } from "react";

const Tranasctions = () => {
  interface UserProps {
    email: string;
    username: string;
  }

  const [users, setUsers] = useState<UserProps[]>([]);

  const fetchUsers = async () => {
    const response = await axios.get("/api/user");
    if (response.status === 200) {
      console.log(response.data);
      setUsers(response.data);
    } else {
      console.error("Error in fetching users", response);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      {users.map((user, index) => (
        <div key={index}>
          <p>{user.email}</p>
          <p>{user.username}</p>
        </div>
      ))}
    </div>
  );
};
export default Tranasctions;
