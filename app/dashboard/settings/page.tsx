"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { User2 } from "lucide-react";
import { ChangeEvent, useState } from "react";
import { toast } from "sonner";

const Settings = () => {
  const [profile, setProfile] = useState({
    username: "",
    email: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const updateProfile = async () => {
    try {
      const response = await axios.post("/api/my", profile);
      if (response.status === 201) {
        setProfile(response.data.updatedProfile);
        toast.success("Profile updated successfully");
        console.log("Profile updated successfully", response);
      } else {
        toast.error("Error while updating profile");
        console.error("Error while updating profile", response);
      }
    } catch (error) {
      console.error("Error updating profile", error);
    }
  };

  return (
    <div className="border rounded-xl p-6 shadow-xl max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-start">Profile Information</h1>
      <p className="text-sm font-thin">Enter your details to update!</p>

      <div className="space-y-2 mt-2">
        <div className="flex justify-center">
          <User2 className="border p-2 rounded-full" size={112} />
        </div>
        {/* <Input type="file" className="w-1/3 cursor-pointer mx-auto" /> */}
        <Label>Email</Label>
        <Input name="email" value={profile.email} onChange={handleChange} />
        <Label>Username</Label>
        <Input
          name="username"
          value={profile.username}
          onChange={handleChange}
        />
        <Button onClick={updateProfile} className="w-full">
          Update
        </Button>
      </div>
    </div>
  );
};

export default Settings;
