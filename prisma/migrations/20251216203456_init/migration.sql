-- CreateTable
CREATE TABLE "Counter" (
    "id" TEXT NOT NULL,
    "lang" TEXT NOT NULL,
    "authorId" TEXT,

    CONSTRAINT "Counter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Counter_list" (
    "id" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "counterId" TEXT,

    CONSTRAINT "Counter_list_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Counter" ADD CONSTRAINT "Counter_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Counter_list" ADD CONSTRAINT "Counter_list_counterId_fkey" FOREIGN KEY ("counterId") REFERENCES "Counter"("id") ON DELETE SET NULL ON UPDATE CASCADE;
