-- AlterTable
ALTER TABLE "users" ALTER COLUMN "latitude" DROP NOT NULL,
ALTER COLUMN "longitude" DROP NOT NULL,
ALTER COLUMN "phone" DROP NOT NULL;
