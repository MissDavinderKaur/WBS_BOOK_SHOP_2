import express, { Request, Response } from "express";
import { Book } from "../models";

const router = express.Router();

// POST /books - Create a new book
router.post("/", async (req: Request, res: Response) => {
  try {
    const newBook = new Book(req.body);
    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (error) {
    res.status(400).json({ error: "Failed to create book" });
  }
});

// GET /books - Get all books
router.get("/", async (req: Request, res: Response) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch books" });
  }
});

// GET /books/:id - Get a single book by ID
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.json(book);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch book" });
  }
});

// PUT /books/:id - Update a book
router.put("/:id", async (req: Request, res: Response) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedBook) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.json(updatedBook);
  } catch (error) {
    res.status(400).json({ error: "Failed to update book" });
  }
});

// DELETE /books/:id - Delete a book
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.json({ message: "Book deleted successfully", book: deletedBook });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete book" });
  }
});

export default router;
