import { z } from "zod";

export const libraryCreateSchema = z.object({
  username: z.string().min(1, "Username is required"),
  bookId: z.string().min(1, "Book ID is required"),
});
