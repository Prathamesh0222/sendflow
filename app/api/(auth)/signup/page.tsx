"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "next-auth/react";
import Image from "next/image";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { SignupInput, SignUpSchema } from "@/app/lib/auth-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { GoogleIcon } from "@/lib/constant";
const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const form = useForm<SignupInput>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data: SignupInput) => {
    try {
      const response = await axios.post("/api/register", data);
      if (response.data.status === 201) {
        await signIn("credentials", {
          redirect: false,
          email: data.email,
          password: data.password,
        });
        toast.success("User created successfully");
        router.push("/dashboard");
      } else {
        toast.error("Error in creating user");
        console.error("Error in creating user", response.data);
      }
    } catch (error) {
      toast.error("Error in creating user");
      console.error("Error in creating user", error);
    }
  };

  return (
    <div className="flex flex-col justify-center h-screen items-center">
      <div className="w-96 p-8 border rounded-xl">
        <Label className="text-2xl flex justify-center font-bold">
          Register
        </Label>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="abc@exmaple.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        placeholder="12345678"
                        type={showPassword ? "text" : "password"}
                        {...field}
                      />
                      {showPassword ? (
                        <EyeOff
                          onClick={togglePassword}
                          className="absolute right-2 top-2 cursor-pointer"
                        />
                      ) : (
                        <Eye
                          onClick={togglePassword}
                          className="absolute right-2 top-2 cursor-pointer"
                        />
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit">
              Submit
            </Button>
            <p className="text-center text-sm">
              Already have an Account?{" "}
              <a href="/api/signin" className="underline font-semibold">
                Signin
              </a>
            </p>
            <div className="border-b w-full"></div>
          </form>
        </Form>
        <Button
          className="w-full border mt-4"
          variant={"ghost"}
          onClick={() => signIn("google")}
        >
          <Image
            src={GoogleIcon}
            alt="GoogleIcon"
            width={26}
            height={26}
            className="items-center"
          />
          Sign in with Google{" "}
        </Button>
      </div>
    </div>
  );
};

export default SignUp;
