import { PrismaClient } from "@prisma/client";
import { auth } from "../../../../auth";
const prisma = new PrismaClient();

export async function GET() {
  const session = await auth();

  try {
    const jobs = await prisma.user.findFirst({
      where: {
        email: `${session?.user?.email}`,
      },
      include: {
        jobs: true,
      },
    });
    

    return new Response(JSON.stringify(jobs), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
