-- CreateTable
CREATE TABLE "caregiver_pet_requests" (
    "id" SERIAL NOT NULL,
    "caregiverId" INTEGER NOT NULL,
    "petId" INTEGER NOT NULL,
    "status" INTEGER NOT NULL DEFAULT 0,
    "message" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "caregiver_pet_requests_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "caregiver_pet_requests" ADD CONSTRAINT "caregiver_pet_requests_caregiverId_fkey" FOREIGN KEY ("caregiverId") REFERENCES "caregiver_profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "caregiver_pet_requests" ADD CONSTRAINT "caregiver_pet_requests_petId_fkey" FOREIGN KEY ("petId") REFERENCES "pets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
