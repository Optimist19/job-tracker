import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();
import { auth } from "../../../../auth";

export async function POST(request: Request) {
  const session = await auth();

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    //   console.log(body, "body")
    //   const { title, company, location, job_status, job_mode } = body;
    const {
      title,
      company,
      location,
      job_status,
      job_mode,
      date_applied,
      job_type
    } = body;

    const existingUser = await prisma.user.findFirst({
      where: { email: session.user.email }
    });

    //   console.log(existingUser, "existingUser")

    if (existingUser) {
      const job = await prisma.job.create({
        data: {
          title,
          company,
          location,
          job_status,
          job_mode,
          date_applied,
          job_type,
          userId: existingUser.id
        }
      });
      return NextResponse.json(job);
    } else {
      const newUser = await prisma.user.create({
        data: {
          email: session.user.email,
          jobs: {
            create: {
              title,
              company,
              location,
              job_status,
              job_mode,
              date_applied,
              job_type
            }
          }
        }
      });
      return NextResponse.json(newUser, { status: 201 });
    }
} catch (error) {
	console.error("Error details:", {
	  error,
	  message: error instanceof Error ? error.message : 'Unknown error',
	  stack: error instanceof Error ? error.stack : undefined
	});
	return NextResponse.json(
	  { error: "Internal Server Error" },
	  { status: 500 }
	);
  
  }
}

// export async function DELETE(request: Request) {
// 	const { id } = await request.json();
//   try {
//     const deletedJob = await prisma.job.delete({
//       where: { id: id }
//     });

//     return NextResponse.json(deletedJob, { status: 200 });
//   } catch (error) {
//     console.error("Error deleting job:", error);
//     return NextResponse.json(
//       { error: "Failed to delete job" },
//       { status: 500 }
//     );
//   }
// }
