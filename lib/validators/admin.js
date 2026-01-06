import { z } from "zod";

export const adminRegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const adminLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
