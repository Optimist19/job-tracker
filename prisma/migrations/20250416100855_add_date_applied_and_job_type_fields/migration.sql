-- AlterTable
ALTER TABLE "Job" ADD COLUMN     "date_applied" TEXT NOT NULL DEFAULT '2025-01-01',
ADD COLUMN     "job_type" TEXT NOT NULL DEFAULT 'remote';
