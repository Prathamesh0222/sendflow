import { authOptions } from "@/app/lib/auth";
import prisma from "@/config/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const { receiverId, amount } = await req.json();
  const senderId = session?.user.id;

  if (!senderId) {
    return NextResponse.json({
      message: "Sender ID is required",
      status: 400,
    });
  }

  const sender = await prisma.user.findFirst({
    where: {
      id: senderId,
    },
  });

  const receiver = await prisma.user.findFirst({
    where: {
      id: receiverId,
    },
  });

  if (!sender || !receiver) {
    throw new Error("User not found");
  }

  if (sender.balance < amount) {
    return NextResponse.json({
      message: "Insufficient balance",
      status: 400,
    });
  }

  try {
    const completeTransaction = await prisma.$transaction(async (prisma) => {
      const newTransaction = await prisma.transaction.create({
        data: {
          amount,
          senderId,
          receiverId,
          status: "PENDING",
        },
      });

      await prisma.user.update({
        where: {
          id: senderId,
        },
        data: {
          balance: {
            decrement: amount,
          },
        },
      });

      await prisma.user.update({
        where: {
          id: receiverId,
        },
        data: {
          balance: {
            increment: amount,
          },
        },
      });

      const completeTransaction = await prisma.transaction.update({
        where: {
          id: newTransaction.id,
        },
        data: {
          status: "COMPLETED",
        },
      });

      return completeTransaction;
    });

    return NextResponse.json({
      message: "Transaction successful",
      status: 200,
      transaction: completeTransaction,
    });
  } catch (error) {
    console.error("Transaction  Failed:", error);
    return NextResponse.json({
      message: "Transaction failed",
      status: 500,
    });
  }
}
