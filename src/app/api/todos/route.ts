import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/auth"; // Ensure authOptions is correctly set up
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Define the shape of the request body
interface TodoRequestBody {
  text: string;
}

// Function to get user from database for OAuth users
async function getUser(sessionUser: any) {
  if (!sessionUser?.id) {
    const dbUser = await prisma.user.findUnique({
      where: { email: sessionUser?.email },
    });
    return dbUser;
  }
  return { id: sessionUser.id };
}

// Fetch only the authenticated user's todos
export async function GET(): Promise<NextResponse> {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    console.error("Unauthorized request: No valid session");
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await getUser(session.user);
  if (!user) {
    console.error("User not found in database:", session.user.email);
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

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

  if (!session || !session.user?.email) {
    console.error("Unauthorized request: No valid session");
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await getUser(session.user);
  if (!user) {
    console.error("User not found in database:", session.user.email);
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

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
