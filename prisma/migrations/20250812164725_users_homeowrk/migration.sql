-- CreateTable
CREATE TABLE "public"."user_homeworks" (
    "user_id" UUID NOT NULL,
    "homework_id" UUID NOT NULL,
    "deadline" VARCHAR(16) NOT NULL,

    CONSTRAINT "user_homeworks_pkey" PRIMARY KEY ("user_id","homework_id")
);

-- CreateIndex
CREATE INDEX "user_homeworks_user_id_idx" ON "public"."user_homeworks"("user_id");

-- CreateIndex
CREATE INDEX "user_homeworks_homework_id_idx" ON "public"."user_homeworks"("homework_id");

-- AddForeignKey
ALTER TABLE "public"."user_homeworks" ADD CONSTRAINT "user_homeworks_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."user_homeworks" ADD CONSTRAINT "user_homeworks_homework_id_fkey" FOREIGN KEY ("homework_id") REFERENCES "public"."homeworks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
