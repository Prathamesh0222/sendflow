import prisma from "@/config/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";

export async function GET(req: NextRequest) {
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
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);

    const skip = (page - 1) * limit;
    const take = limit;

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
      skip,
      take,
    });

    const totalCount = await prisma.user.count({
      where: {
        NOT: {
          email: session.user.email,
        },
      },
    });

    const totalPages = Math.ceil(totalCount / limit);

    return NextResponse.json({
      users,
      totalPages,
      currentPage: page,
      totalCount,
    });
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
