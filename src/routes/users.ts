import express from "express";
import type { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { User } from "../models";
import { userDeleteSchema, userLoginSchema, userPasswordUpdateSchema, userRegisterSchema } from "../schemas/user";

const router = express.Router();

// POST /users/register - Create a new user if not already present
router.post("/register", async (req: Request, res: Response) => {
  try {
    const parsed = userRegisterSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: "Invalid request data", details: parsed.error.flatten().fieldErrors });
    }

    const { username, email, password } = parsed.data;
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(409).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    const savedUser = await newUser.save();

    const { password: _, ...userSafe } = savedUser.toObject();
    res.status(201).json(userSafe);
  } catch (error) {
    res.status(500).json({ error: "Failed to create user" });
  }
});

// POST /users/login - Authenticate user
router.post("/login", async (req: Request, res: Response) => {
  try {
    const parsed = userLoginSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: "Invalid request data", details: parsed.error.flatten().fieldErrors });
    }

    const { email, password } = parsed.data;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const { password: _, ...userSafe } = user.toObject();
    res.json(userSafe);
  } catch (error) {
    res.status(500).json({ error: "Failed to login" });
  }
});

// PUT /users/:id/password - Update a user's password
router.put("/:id/password", async (req: Request, res: Response) => {
  try {
    const parsed = userPasswordUpdateSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: "Invalid request data", details: parsed.error.flatten().fieldErrors });
    }

    const { oldPassword, newPassword } = parsed.data;
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Old password is incorrect" });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to update password" });
  }
});

// DELETE /users/:id - Delete a user account
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const parsed = userDeleteSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: "Invalid request data", details: parsed.error.flatten().fieldErrors });
    }

    const { password } = parsed.data;
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Password is incorrect" });
    }

    await user.deleteOne();
    res.json({ message: "User account deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete user" });
  }
});

export default router;
