import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(1),
   price: z.coerce.number().nonnegative(),  
  stock: z.coerce.number().int().nonnegative(),
  status: z.enum(["Active", "Draft", "Out of Stock"]).optional(),
  description: z.string().optional(),
   imageUrl: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^https?:\/\//.test(val),
      { message: "Invalid image URL" }
    ),
});

