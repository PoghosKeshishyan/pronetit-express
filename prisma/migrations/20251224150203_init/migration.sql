-- CreateTable
CREATE TABLE "Consultentcy_service" (
    "id" TEXT NOT NULL,
    "lang" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "name_label" TEXT NOT NULL,
    "surname_label" TEXT NOT NULL,
    "phone_label" TEXT NOT NULL,
    "email_label" TEXT NOT NULL,
    "company_label" TEXT NOT NULL,
    "service_label" TEXT NOT NULL,
    "name_placeholder" TEXT NOT NULL,
    "phone_placeholder" TEXT NOT NULL,
    "message_placeholder" TEXT NOT NULL,
    "services_placeholder" TEXT NOT NULL,
    "surname_placeholder" TEXT NOT NULL,
    "email_placeholder" TEXT NOT NULL,
    "company_placeholder" TEXT NOT NULL,
    "button" TEXT NOT NULL,
    "authorId" TEXT,

    CONSTRAINT "Consultentcy_service_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Consultentcy_service" ADD CONSTRAINT "Consultentcy_service_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
