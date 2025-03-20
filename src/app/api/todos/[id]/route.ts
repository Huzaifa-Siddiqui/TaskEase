import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import  {authOptions}  from "../../../../lib/auth";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Define the shape of the request body
interface TodoRequestBody {
  text: string;
}

// Define the shape of the session user
interface SessionUser {
  id: string;
  email: string;
}

// Fetch only the authenticated user's todos
export async function GET(): Promise<NextResponse> {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = session.user as SessionUser;

  try {
    const todos = await prisma.todo.findMany({
      where: { userId: user.id },
    });

    return NextResponse.json(todos, { status: 200 });
  } catch (error) {
    console.error("Error fetching todos:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// Create a new todo for the authenticated user
export async function POST(req: Request): Promise<NextResponse> {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = session.user as SessionUser;

  try {
    const body: TodoRequestBody = await req.json();

    if (!body.text) {
      return NextResponse.json({ error: "Text is required" }, { status: 400 });
    }

    const newTodo = await prisma.todo.create({
      data: {
        text: body.text,
        completed: false,
        userId: user.id,
      },
    });

    return NextResponse.json(newTodo, { status: 201 });
  } catch (error) {
    console.error("Error creating todo:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// Delete a todo for the authenticated user
export async function DELETE(req: Request, { params }: { params: { id: string } }): Promise<NextResponse> {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.email) {
      return NextResponse.json({ error: "Unauthorized - No session" }, { status: 401 });
    }

    const todoId = params.id;
    const userEmail = session.user.email;
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
