import { z } from "zod";

export const bookCreateSchema = z.object({
  title: z.string().min(1, "Title is required"),
  author: z.string().min(1, "Author is required"),
  category: z.string().min(1, "Category is required"),
  description: z.string().min(1, "Description is required"),
  rating: z.number().min(0, "Rating must be at least 0").max(5, "Rating must be at most 5").optional(),
  price: z.number().nonnegative("Price must be a positive number"),
  image: z.string().url("Image must be a valid URL"),
});

export const bookUpdateSchema = bookCreateSchema.partial().refine(
  (data) => Object.keys(data).length > 0,
  { message: "At least one field is required to update" }
);
