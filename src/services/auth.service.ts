import { pool } from "../config/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const loginUser = async (email: string, password: string) => {
  const user = await pool.query(
    "SELECT * FROM users WHERE email=$1",
    [email]
  );

  if (!user.rows[0]) {
    throw new Error("User not found");
  }

  // ✅ secure password check
  const isMatch = await bcrypt.compare(
    password,
    user.rows[0].password
  );

  if (!isMatch) {
    throw new Error("Invalid password");
  }

  const payload = {
    id: user.rows[0].id,
    role: user.rows[0].role,
  };

  if (!process.env.JWT_ACCESS_SECRET || !process.env.JWT_REFRESH_SECRET) {
    throw new Error("JWT secrets missing");
  }

  const accessToken = jwt.sign(
    payload,
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: "15m" }
  );

  const refreshToken = jwt.sign(
    payload,
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: "7d" }
  );

  await pool.query(
    "UPDATE users SET refresh_token=$1 WHERE id=$2",
    [refreshToken, user.rows[0].id]
  );

  return {
    accessToken,
    refreshToken,
  };
};