/*
  Warnings:

  - Changed the type of `job_mode` on the `Job` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `job_status` on the `Job` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Job" DROP COLUMN "job_mode",
ADD COLUMN     "job_mode" TEXT NOT NULL,
DROP COLUMN "job_status",
ADD COLUMN     "job_status" TEXT NOT NULL;

-- DropEnum
DROP TYPE "JobMode";

-- DropEnum
DROP TYPE "JobStatus";
