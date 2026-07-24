-- CreateEnum
CREATE TYPE "NoteType" AS ENUM ('TEXT', 'DRAWING', 'MIXED');

-- CreateTable
CREATE TABLE "student_notes" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "noteType" "NoteType" NOT NULL DEFAULT 'TEXT',
    "content" JSONB NOT NULL,
    "thumbnail" TEXT,
    "courseId" TEXT,
    "chapterId" TEXT,
    "topicId" TEXT,
    "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "isFavorite" BOOLEAN NOT NULL DEFAULT false,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,
    "metadata" JSONB,
    "lastEditedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "student_notes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "student_notes_studentId_isArchived_lastEditedAt_idx" ON "student_notes"("studentId", "isArchived", "lastEditedAt");

-- CreateIndex
CREATE INDEX "student_notes_studentId_isFavorite_idx" ON "student_notes"("studentId", "isFavorite");

-- AddForeignKey
ALTER TABLE "student_notes" ADD CONSTRAINT "student_notes_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
