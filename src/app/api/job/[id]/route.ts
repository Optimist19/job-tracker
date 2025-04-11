
import { NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();



// request: Request. The "req: Request" you know is not the only argument in the route handler. It is on the only one that gets data for you from the request. The second argument is an object with params, which contains the parameters of the route, as we have "api/job/[id]". It is the [Id] that is the params and  which you will get from here to achieve the functionality of deleting a job or editing a data.





type Props = {
  params: {
    id: string;
  };
};

export async function GET(request: NextRequest, { params }: Props) {
  try {
    const job = await prisma.job.findUnique({
      where: { id: params.id }
    });

    if (!job) {
      return Response.json(
        { error: "Job not found" }, 
        { status: 404 }
      );
    }

    return Response.json(job);
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "Internal Server Error" }, 
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest, { params }: Props) {
  try {
    const body = await request.json();
    const job = await prisma.job.update({
      where: { id: params.id },
      data: body
    });

    return Response.json(job);
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "Internal Server Error" }, 
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: Props) {
  try {
    const job = await prisma.job.delete({
      where: { id: params.id }
    });

    return Response.json(job);
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "Failed to delete job" }, 
      { status: 500 }
    );
  }
}