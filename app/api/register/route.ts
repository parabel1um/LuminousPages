import User from "../../../models/User";
import connect from "../../../utils/db";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

type RequestBody = {
  email: string;
  password: string;
  username: string;
  name: string;
  pages?: string[];
};

export const POST = async (request: NextRequest) => {
  const { email, password, username, name, pages }: RequestBody =
    await request.json();

  await connect();

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return new NextResponse("Email is already in use", { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    email,
    password: hashedPassword,
    username,
    name,
    pages,
  });

  try {
    await newUser.save();
    return new NextResponse("User is registered", { status: 200 });
  } catch (error) {
    return new NextResponse((error as Error).message, {
      status: 500,
    });
  }
};
