/*
  Warnings:

  - The primary key for the `Vessel` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Vessel" DROP CONSTRAINT "Vessel_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Vessel_pkey" PRIMARY KEY ("id");
