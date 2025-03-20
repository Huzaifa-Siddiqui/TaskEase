import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import  {authOptions}  from "../../../lib/auth";

const prisma = new PrismaClient();

interface Params {
  params: {
    id: string;
  };
}

export async function DELETE(req: Request, { params }: Params): Promise<NextResponse> {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized - No session" }, { status: 401 });
    }

    const todoId: string = params.id;
    const userEmail: string = session.user.email;
    console.log("Deleting Todo:", todoId, "Requested by:", userEmail);

    // Retrieve user from the database
    const user = await prisma.user.findUnique({
      where: { email: userEmail },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Find the todo and ensure it belongs to the user
    const todo = await prisma.todo.findUnique({
      where: { id: todoId },
    });

    if (!todo) {
      return NextResponse.json({ error: "Todo not found" }, { status: 404 });
    }

    if (todo.userId !== user.id) {
      console.log("Unauthorized delete attempt by:", user.email);
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    // Delete the todo
    await prisma.todo.delete({
      where: { id: todoId },
    });

    return NextResponse.json({ message: "Todo deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting todo:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
