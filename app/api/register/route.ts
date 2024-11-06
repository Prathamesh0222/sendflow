import { SignUpSchema } from "@/app/lib/auth-validation";
import prisma from "@/config/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  const data = await req.json();
  const result = await SignUpSchema.safeParse(data);
  if (!result.success) {
    return NextResponse.json({
      message: "Invalid data",
      status: 400,
      errors: result.error.errors,
    });
  }

  const { email, username, password } = result.data;

  try {
    const userExists = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (userExists) {
      return NextResponse.json({
        message: "User already exists",
        status: 400,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
      },
    });

    return NextResponse.json({
      message: "User created successfully",
      status: 201,
    });
  } catch (error) {
    console.error("Error in creating user", error);
    return NextResponse.json({
      message: "Something went wrong",
      status: 500,
    });
  }
}
