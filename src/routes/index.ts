import express from "express";
import booksRouter from "./books";
import usersRouter from "./users";

const router = express.Router();

router.use("/books", booksRouter);
router.use("/users", usersRouter);

export default router;
