-- AlterTable
ALTER TABLE "Posts" ADD COLUMN     "tags" TEXT[],
ALTER COLUMN "status" SET DEFAULT 'DRAFT';
