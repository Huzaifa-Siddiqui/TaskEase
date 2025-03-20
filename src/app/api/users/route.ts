import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Define a type for the user response
interface User {
  id: string;
  name: string | null;
  email: string;
}

// Fetch all users with selected fields
export async function GET(): Promise<NextResponse> {
  try {
    const users: User[] = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
