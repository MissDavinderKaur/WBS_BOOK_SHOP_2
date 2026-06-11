import mongoose, { Schema } from "mongoose";

export interface Library {
  username: string;
  bookId: string;
}

const LibrarySchema: Schema<Library> = new Schema(
  {
    username: { type: String, required: true, trim: true },
    bookId: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

LibrarySchema.index({ username: 1, bookId: 1 }, { unique: true });

export const Library = mongoose.model<Library>("Library", LibrarySchema);
