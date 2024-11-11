import prisma from "@/config/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({
      message: "Unauthorized",
      status: 401,
    });
  }

  try {
    const { email, username } = await req.json();

    await prisma.user.update({
      where: {
        email: session?.user.email,
      },
      data: {
        email: email || session?.user.email,
        username,
      },
    });

    return NextResponse.json({
      message: "Profile updated successfully",
      status: 201,
    });
  } catch (error) {
    console.error("Error while updating profile", error);
    return NextResponse.json({
      message: "Error while updating profile",
      error: error instanceof Error ? error.message : "Unknown error",
      status: 500,
    });
  }
}
