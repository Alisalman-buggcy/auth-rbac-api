import { Request, Response } from "express";
import { verifyRefreshToken, generateAccessToken } from "../utils/jwt";
import { pool } from "../config/db";

export const refreshToken = async (req: Request, res: Response) => {
  const { token } = req.body;

  try {
    const decoded = verifyRefreshToken(token) as any;

    const user = await pool.query(
      "SELECT * FROM users WHERE id=$1 AND refresh_token=$2",
      [decoded.id, token]
    );

    if (!user.rows[0]) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    const newAccessToken = generateAccessToken({
      id: decoded.id,
      role: decoded.role
    });

    res.json({ accessToken: newAccessToken });

  } catch {
    res.status(403).json({ message: "Token expired or invalid" });
  }
};