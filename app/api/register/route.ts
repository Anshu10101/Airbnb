import prisma from "@/lib/prismadb";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

/**
 * POST handler for user registration
 * Updated with proper error handling for Next.js 15
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, name, password } = body;

    // Validate required fields
    if (!email || !name || !password) {
      return NextResponse.json(
        { 
          error: "Missing required fields",
          required: ["email", "name", "password"] 
        },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Email already in use" },
        { status: 409 }
      );
    }

    // Hash password and create user
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        hashedPassword,
      },
    });

    // Return user without password
    return NextResponse.json({
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    });
  } catch (error) {
    console.error("Error in POST register:", error);
    return NextResponse.json(
      { error: "Failed to register user" },
      { status: 500 }
    );
  }
}
