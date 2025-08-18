-- CreateTable
CREATE TABLE "public"."UserSubjects" (
    "user_id" UUID NOT NULL,
    "subject_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserSubjects_pkey" PRIMARY KEY ("user_id","subject_id")
);

-- CreateIndex
CREATE INDEX "UserSubjects_user_id_idx" ON "public"."UserSubjects"("user_id");

-- CreateIndex
CREATE INDEX "UserSubjects_subject_id_idx" ON "public"."UserSubjects"("subject_id");

-- AddForeignKey
ALTER TABLE "public"."UserSubjects" ADD CONSTRAINT "UserSubjects_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UserSubjects" ADD CONSTRAINT "UserSubjects_subject_id_fkey" FOREIGN KEY ("subject_id") REFERENCES "public"."Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
