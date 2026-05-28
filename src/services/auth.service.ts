import { pool } from "../config/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const loginUser = async (
  email: string,
  password: string
) => {
  const user = await pool.query(
    "SELECT * FROM users WHERE email=$1",
    [email]
  );

  if (!user.rows[0]) {
    throw new Error("User not found");
  }

  console.log("USER FOUND");

  // TEMPORARY: plain password check
  if (password !== user.rows[0].password) {
    throw new Error("Invalid password");
  }

  const payload = {
    id: user.rows[0].id,
    role: user.rows[0].role,
  };

  console.log("ACCESS SECRET:", process.env.JWT_ACCESS_SECRET);
  console.log("REFRESH SECRET:", process.env.JWT_REFRESH_SECRET);

  const accessToken = jwt.sign(
    payload,
    process.env.JWT_ACCESS_SECRET || "fallback_secret",
    {
      expiresIn: "15m",
    }
  );

  const refreshToken = jwt.sign(
    payload,
    process.env.JWT_REFRESH_SECRET || "fallback_refresh",
    {
      expiresIn: "7d",
    }
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