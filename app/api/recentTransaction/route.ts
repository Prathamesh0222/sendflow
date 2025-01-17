import { authOptions } from "@/app/lib/auth";
import prisma from "@/config/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
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
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "5");

    const offset = (page - 1) * limit;

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
      skip: offset,
      take: limit,
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

    const totalTransaction = await prisma.transaction.count({
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
    });

    const totalPages = Math.ceil(totalTransaction / limit);

    return NextResponse.json(
      {
        recentTransaction,
        pagination: {
          page,
          limit,
          totalPages,
          totalTransaction,
        },
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
