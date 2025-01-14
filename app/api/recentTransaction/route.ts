import { authOptions } from "@/app/lib/auth";
import prisma from "@/config/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const GET = async () => {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;

  if (!userId) {
    return NextResponse.json(
      {
        message: "Unauthorized",
      },
      {
        status: 401,
      }
    );
  }

  try {
    const recentTransaction = await prisma.transaction.findMany({
      where: {
        OR: [
          {
            senderId: userId,
          },
          {
            receiverId: userId,
          },
        ],
      },
      orderBy: {
        timestamp: "desc",
      },
      select: {
        id: true,
        amount: true,
        status: true,
        timestamp: true,
        sender: {
          select: {
            username: true,
            email: true,
          },
        },
        receiver: {
          select: {
            username: true,
            email: true,
          },
        },
      },
    });

    return NextResponse.json(
      {
        recentTransaction,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error while fetching the recent transactions", error);
    return NextResponse.json({
      message: "Error while fetching the recent transactions",
      status: 400,
    });
  }
};
