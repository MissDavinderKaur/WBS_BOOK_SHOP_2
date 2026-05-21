import mongoose, { Schema, Document } from "mongoose";

export interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  description: string;
  rating: number;
  price: number;
  image: string;
}

const BookSchema: Schema<Book> = new Schema(
  {
    id: { type: String, unique: true, sparse: true },
    title: { type: String, required: true },
    author: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    price: { type: Number, required: true, min: 0 },
    image: { type: String, required: true },
  },
  { timestamps: true }
);

export const Book = mongoose.model<Book>("Book", BookSchema);
