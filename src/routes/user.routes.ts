import express from "express";
import { pool } from "../config/db";
import {
  verifyToken,
  AuthRequest,
} from "../middlewares/auth.middleware";

import {
  authorizeRoles,
} from "../middlewares/role.middleware";

const router = express.Router();


router.get(
  "/profile",
  verifyToken,
  async (req: AuthRequest, res) => {
    try {
      const userId = req.user.id;

      const result = await pool.query(
        "SELECT id, name, email, role, created_at FROM users WHERE id=$1",
        [userId]
      );

      res.json({
        success: true,
        user: result.rows[0],
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  }
);


// ADMIN ROUTE
router.get(
  "/admin",
  verifyToken,
  authorizeRoles("admin"),
  async (_req, res) => {
    res.json({
      success: true,
      message: "Welcome Admin 🔥",
    });
  }
);

export default router;