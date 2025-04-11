import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const userData: Prisma.UserCreateInput[] = [
  {
    email: "alice@prisma.io",
    jobs: {
      create: [
        {
          title: "Frontend",
          company: "Google",
          location: "USA",
          job_status: "declined",
          job_mode: "full time"
        },
        {
          title: "Backend",
          company: "Facebook",
          location: "Nigeria",
          job_status: "declined",
          job_mode: "full time"
        }
      ]
    }
  },
  {
    email: "bob@prisma.io",
    jobs: {
      create: [
        {
          title: "Frontend",
          company: "Google",
          location: "USA",
            job_status: "declined",
          job_mode: "full time"
        },
        {
          title: "Backend",
          company: "Facebook",
          location: "Nigeria",
            job_status: "declined",
          job_mode: "full time"
        }
      ]
    }
  }
];

// async function main() {
//   for (const u of userData) {
//     await prisma.user.create({ data: u });
//   }
// }
async function main() {
	for (const u of userData) {
	  try {
		await prisma.user.create({ data: u });
	  } catch (error) {
		console.error("Error creating user:", error);
	  }
	}
  }
  

main() 

// import { PrismaClient, Prisma } from '@prisma/client'

// const prisma = new PrismaClient()

// const userData: Prisma.UserCreateInput[] = [
//   {
//     name: 'Alice',
//     email: 'alice@prisma.io'
//   },
//   {
//     name: 'Bob',
//     email: 'bob@prisma.io'
//   }
// ]

// export async function main() {
//   for (const u of userData) {
//     await prisma.user.create({ data: u })
//   }
// }

// main()