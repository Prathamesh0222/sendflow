import prisma from "@/config/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { receiverId, senderId, amount } = await req.json();

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
    return NextResponse.json({
      message: "User not found",
      status: 404,
    });
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
          balance: sender.balance - amount,
        },
      });

      await prisma.user.update({
        where: {
          id: receiverId,
        },
        data: {
          balance: receiver.balance + amount,
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
      error: (error as any).message,
    });
  }
}
