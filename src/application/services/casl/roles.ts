import { z } from "zod";

export const roleSchema = z.union([z.literal("ADMIN"), z.literal("MODERATOR"), z.literal("USER")]);

export type Role = z.infer<typeof roleSchema>;
