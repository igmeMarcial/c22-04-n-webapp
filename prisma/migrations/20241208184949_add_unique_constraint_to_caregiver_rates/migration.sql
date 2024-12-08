/*
  Warnings:

  - A unique constraint covering the columns `[caregiverId,serviceId]` on the table `caregiver_rates` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "caregiver_rates_caregiverId_serviceId_key" ON "caregiver_rates"("caregiverId", "serviceId");
