/*
  Warnings:

  - You are about to drop the column `jobMode` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `jobStatus` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - Added the required column `job_mode` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `job_status` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Job` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User_email_key";

-- AlterTable
ALTER TABLE "Job" DROP COLUMN "jobMode",
DROP COLUMN "jobStatus",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "job_mode" "JobMode" NOT NULL,
ADD COLUMN     "job_status" "JobStatus" NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "name",
ALTER COLUMN "email" DROP NOT NULL;
