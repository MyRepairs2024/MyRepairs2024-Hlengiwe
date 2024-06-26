-- CreateEnum
CREATE TYPE "ServiceProviderRole" AS ENUM ('APPLIANCE_REPAIR', 'PLUMBER', 'ELECTRICIAN', 'HVAC_TECHNICIAN', 'CARPENTER', 'PAINTER', 'ROOFER', 'FLOORING_SPECIALIST', 'LOCKSMITH', 'PEST_CONTROL_EXPERT', 'GARDENING_LANDSCAPING_PROFESSIONAL', 'HOME_SECURITY_INSTALLER', 'WINDOW_DOOR_INSTALLER', 'HANDYMAN', 'CLEANING_JANITORIAL');

-- CreateEnum
CREATE TYPE "BusinessType" AS ENUM ('BUSINESS', 'FREELANCER');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserProfile" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "bio" TEXT,
    "avatar" TEXT,

    CONSTRAINT "UserProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServiceProviderSignup" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "verificationKey" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "avatar" TEXT,

    CONSTRAINT "ServiceProviderSignup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProviderContactInfo" (
    "id" SERIAL NOT NULL,
    "businesstype" "BusinessType" NOT NULL,
    "providertype" "ServiceProviderRole" NOT NULL,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "contactnumber" TEXT NOT NULL,
    "address" TEXT NOT NULL,

    CONSTRAINT "ProviderContactInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OnboardQuestions" (
    "id" SERIAL NOT NULL,
    "licenses" TEXT NOT NULL,
    "experience" TEXT NOT NULL,
    "insurance" TEXT NOT NULL,
    "workquality" TEXT NOT NULL,
    "communication" TEXT NOT NULL,

    CONSTRAINT "OnboardQuestions_pkey" PRIMARY KEY ("id")
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
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Servicepay" (
    "id" SERIAL NOT NULL,
    "serviceType" TEXT NOT NULL,
    "pricePerHour" DOUBLE PRECISION NOT NULL,
    "paymentStatus" TEXT,

    CONSTRAINT "Servicepay_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "paidrequests" (
    "id" SERIAL NOT NULL,
    "cus_email" TEXT NOT NULL,
    "pro_email" TEXT NOT NULL,
    "service" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "cus_address" TEXT NOT NULL,

    CONSTRAINT "paidrequests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pendingrequests" (
    "id" SERIAL NOT NULL,
    "cus_email" TEXT NOT NULL,
    "pro_email" TEXT NOT NULL,
    "service" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "cus_address" TEXT NOT NULL,
    "pro_address" TEXT NOT NULL,

    CONSTRAINT "pendingrequests_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UserProfile_userId_key" ON "UserProfile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "ServiceProviderSignup_email_key" ON "ServiceProviderSignup"("email");

-- AddForeignKey
ALTER TABLE "UserProfile" ADD CONSTRAINT "UserProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

