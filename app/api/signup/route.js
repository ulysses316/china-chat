import { connectMongo } from "@/lib/db/mongoose";
import User from "@/lib/models/users";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { email, password, name } = await request.json();

  try {
    await connectMongo();

    const userExist = await User.findOne({ email: email });

    if (userExist) {
      return NextResponse.json({ error: "El usuario ya existe" }, { status: 400 });
    }

    const user = new User({
      email: email,
      password: password,
      name: name,
    });

    user.save();

    return NextResponse.json(
      { message: "El usuario se creo correctamente", data: user },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
