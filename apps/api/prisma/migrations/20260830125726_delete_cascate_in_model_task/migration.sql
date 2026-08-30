-- DropForeignKey
ALTER TABLE "task" DROP CONSTRAINT "task_priority_id_fkey";

-- AddForeignKey
ALTER TABLE "task" ADD CONSTRAINT "task_priority_id_fkey" FOREIGN KEY ("priority_id") REFERENCES "priority"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
