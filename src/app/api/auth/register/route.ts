import bcrypt from "bcrypt";
import prisma from "@/lib/prisma/prisma";

export async function POST(request: Request) {
  const { email, password } = await request.json();

  const userAlreadyExists = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (userAlreadyExists) {
    return new Response("User already exists", { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  return Response.json(
    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    }),
  );
}
