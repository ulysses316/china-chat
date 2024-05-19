import { connectMongo } from "@/lib/db/mongoose";
import User from "@/lib/models/users";
import { NextResponse } from "next/server";

export async function GET(request, res) {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.searchParams);
  const email = searchParams.get("email");

  if (request.method !== "GET") {
    return NextResponse.json(
      { message: "Method not allowed" },
      { status: 405 }
    );
  }

  try {
    await connectMongo();

    const users = await User.find({ email: { $ne: email } });

    if (typeof users === "undefined") {
      return NextResponse.json(
        { error: users },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({ data: users });
  } catch (error) {}
}
