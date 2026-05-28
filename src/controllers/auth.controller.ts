import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { pool } from "../config/db";
import { loginUser } from "../services/auth.service";

export const register = async (req: Request, res: Response) => {
  try {
    console.log("========== REGISTER ==========");
    console.log("Headers:", req.headers);
    console.log("Body:", req.body);

    const { name, email, password, role } = req.body || {};

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email and password are required",
        receivedBody: req.body,
      });
    }

    const existingUser = await pool.query(
      "SELECT id FROM users WHERE email = $1",
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(String(password), 10);

    const result = await pool.query(
      `
      INSERT INTO users (name, email, password, role)
      VALUES ($1, $2, $3, $4)
      RETURNING id, name, email, role, created_at
      `,
      [name, email, hashedPassword, role || "user"]
    );

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: result.rows[0],
    });
  } catch (error) {
    console.error("REGISTER ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    console.log("========== LOGIN ==========");
    console.log("Body:", req.body);

    const { email, password } = req.body || {};

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const tokens = await loginUser(email, password);

    return res.status(200).json({
      success: true,
      ...tokens,
    });
  } catch (err: any) {
    console.error("LOGIN ERROR:", err);

    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};