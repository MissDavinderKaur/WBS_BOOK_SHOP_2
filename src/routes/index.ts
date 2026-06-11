import express from "express";
import booksRouter from "./books";
import usersRouter from "./users";
import libraryRouter from "./library";

const router = express.Router();

router.use("/books", booksRouter);
router.use("/users", usersRouter);
router.use("/library", libraryRouter);

export default router;
