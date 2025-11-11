-- DropForeignKey
ALTER TABLE "deletion_requests" DROP CONSTRAINT "deletion_requests_user_id_fkey";

-- AlterTable
ALTER TABLE "deletion_requests" ALTER COLUMN "user_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "deletion_requests" ADD CONSTRAINT "deletion_requests_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
