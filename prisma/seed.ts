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
          job_mode: "full time",
          date_applied: "2025-04-16",
          job_type: "remote",
        },
        {
          title: "Backend",
          company: "Facebook",
          location: "Nigeria",
          job_status: "declined",
          job_mode: "full time",
          date_applied: "2025-04-16",
          job_type: "onsite",
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
          job_mode: "full time",
          date_applied: "2025-04-16",
          job_type: "hybrid",
        },
        {
          title: "Backend",
          company: "Facebook",
          location: "Nigeria",
          job_status: "declined",
          job_mode: "full time",
          date_applied: "2025-04-16",
          job_type: "onsite",
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