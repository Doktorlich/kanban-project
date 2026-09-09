import { loginSchema, registerSchema } from "./auth.schema";
import { workspaceSchema as workspaceSchemaImpl } from "./workspace.schema";
import { boardSchema as boardSchemaImpl } from "./board.schema";
import { createColumnSchema, updateColumnSchema } from "./column.schema";
import { createTaskSchema, updateTaskSchema } from "./task.schema";

export const authSchema = { loginSchema, registerSchema };
export const workspaceSchema = { workspaceSchema: workspaceSchemaImpl };
export const boardSchema = { boardSchema: boardSchemaImpl };
export const columnSchema = { createColumnSchema, updateColumnSchema };
export const taskSchema = { createTaskSchema, updateTaskSchema };
