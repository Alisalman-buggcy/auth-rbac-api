import { Request, Response, NextFunction } from "express";

export const roleMiddleware = (role: string) => {
  return (req: any, res: Response, next: NextFunction) => {
    if (req.user.role !== role) {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  };
};