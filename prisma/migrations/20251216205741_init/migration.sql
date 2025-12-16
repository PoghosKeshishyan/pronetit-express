-- CreateTable
CREATE TABLE "Itsolution" (
    "id" TEXT NOT NULL,
    "lang" TEXT NOT NULL,
    "titleSmall" TEXT NOT NULL,
    "titleBig" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "authorId" TEXT,

    CONSTRAINT "Itsolution_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorksType" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "itsolutionId" TEXT,

    CONSTRAINT "WorksType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Itsolution_image" (
    "id" TEXT NOT NULL,
    "leftColumn" JSONB NOT NULL,
    "rightColumn" JSONB NOT NULL,
    "itsolutionId" TEXT,

    CONSTRAINT "Itsolution_image_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Itsolution" ADD CONSTRAINT "Itsolution_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorksType" ADD CONSTRAINT "WorksType_itsolutionId_fkey" FOREIGN KEY ("itsolutionId") REFERENCES "Itsolution"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Itsolution_image" ADD CONSTRAINT "Itsolution_image_itsolutionId_fkey" FOREIGN KEY ("itsolutionId") REFERENCES "Itsolution"("id") ON DELETE SET NULL ON UPDATE CASCADE;
