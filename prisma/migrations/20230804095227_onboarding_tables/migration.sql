/*
  Warnings:

  - You are about to drop the `Serviceproviders` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "ServiceProviderRole" AS ENUM ('APPLIANCE_REPAIR', 'PLUMBER', 'ELECTRICIAN', 'HVAC_TECHNICIAN', 'CARPENTER', 'PAINTER', 'ROOFER', 'FLOORING_SPECIALIST', 'LOCKSMITH', 'PEST_CONTROL_EXPERT', 'GARDENING_LANDSCAPING_PROFESSIONAL', 'HOME_SECURITY_INSTALLER', 'WINDOW_DOOR_INSTALLER', 'HANDYMAN', 'CLEANING_JANITORIAL');

-- DropTable
DROP TABLE "Serviceproviders";

-- DropTable
DROP TABLE "users";

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "profilePicture" BYTEA NOT NULL,
    "phoneNumber" BIGINT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServiceProviderSignup" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "verificationKey" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "ServiceProviderSignup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServiceProvider" (
    "id" SERIAL NOT NULL,
    "profession" "ServiceProviderRole" NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "contacts" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "proofOfAddress" BYTEA NOT NULL,
    "businessLicence" BYTEA NOT NULL,
    "cv" BYTEA NOT NULL,
    "insurance" BYTEA NOT NULL,
    "photos" BYTEA NOT NULL,
    "clients" BIGINT NOT NULL,
    "identificationDoc" BYTEA NOT NULL,
    "driversLicense" BYTEA NOT NULL,
    "passport" BYTEA NOT NULL,
    "activeContactNumber" TEXT NOT NULL,
    "streetAddress" TEXT NOT NULL,
    "streetAddressLine2" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "province" TEXT NOT NULL,
    "postalCode" BIGINT NOT NULL,
    "cipcRegistration" BOOLEAN NOT NULL,
    "businessLicenses" BYTEA NOT NULL,
    "tradeCertifications" BYTEA NOT NULL,
    "certifications" BYTEA NOT NULL,
    "insuranceCoverage" BYTEA NOT NULL,
    "workHistoryCV" BYTEA NOT NULL,
    "workedWithClients" TEXT NOT NULL,
    "selfPhoto" BYTEA NOT NULL,
    "criminalBackground" BYTEA NOT NULL,

    CONSTRAINT "ServiceProvider_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Service" (
    "id" SERIAL NOT NULL,
    "serviceProviderEmail" TEXT NOT NULL,
    "serviceType" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "pricePerHour" DOUBLE PRECISION NOT NULL,
    "availability" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "ServiceProviderSignup_email_key" ON "ServiceProviderSignup"("email");

-- CreateIndex
CREATE UNIQUE INDEX "ServiceProvider_email_key" ON "ServiceProvider"("email");
