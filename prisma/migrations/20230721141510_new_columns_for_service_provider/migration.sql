-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Serviceproviders" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT,
    "phoneNumber" TEXT NOT NULL,
    "profession" TEXT NOT NULL,
    "servicesOffered" TEXT[],
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "zipCode" TEXT NOT NULL,
    "website" TEXT,
    "rating" DOUBLE PRECISION NOT NULL,
    "availability" BOOLEAN,

    CONSTRAINT "Serviceproviders_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Serviceproviders_username_key" ON "Serviceproviders"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Serviceproviders_password_key" ON "Serviceproviders"("password");

-- CreateIndex
CREATE UNIQUE INDEX "Serviceproviders_email_key" ON "Serviceproviders"("email");
