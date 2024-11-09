import prisma from "@/config/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      {
        message: "Unauthorized",
      },
      { status: 401 }
    );
  }

  try {
    const users = await prisma.user.findMany({
      where: {
        NOT: {
          email: session.user.email,
        },
      },
      select: {
        id: true,
        username: true,
        email: true,
      },
    });
    return NextResponse.json(users);
  } catch (error) {
    console.error("Error in getting users", error);
    return NextResponse.json(
      {
        message: "Error in getting users",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
