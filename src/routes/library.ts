import express from "express";
import type { Request, Response } from "express";
import { Library } from "../models/library";
import { User } from "../models/user";
import { Book } from "../models/book";
import { libraryCreateSchema } from "../schemas/library";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    const parsed = libraryCreateSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: "Invalid request data", details: parsed.error.flatten().fieldErrors });
    }

    const { username, bookId } = parsed.data;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const existing = await Library.findOne({ username, bookId });
    if (existing) {
      return res.status(409).json({ error: "Book already in library" });
    }

    const newEntry = new Library({ username, bookId });
    const saved = await newEntry.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ error: "Failed to add book to library" });
  }
});

router.get("/:username", async (req: Request, res: Response) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const libraryEntries = await Library.find({ username });
    const bookIds = libraryEntries.map((entry) => entry.bookId);
    const books = await Book.find({ id: { $in: bookIds } });
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: "Failed to load library" });
  }
});

export default router;
