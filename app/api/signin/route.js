import { connectMongo } from "@/lib/db/mongoose";
import User from "@/lib/models/users";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(request) {
  const { email, password } = await request.json();

  try {
    await connectMongo();
    const user = await User.findOne({ email: email });

    if (!user) {
      return NextResponse.json(
        { error: "No se encontro ningun usuario" },
        { status: 404 }
      );
    }

    const passwordValidate = await bcrypt.compare(password, user.password);

    if (!passwordValidate) {
      return NextResponse.json(
        { error: "La contraseña no es correcta" },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { message: "Inicio de sesion correctamente", data: user },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
