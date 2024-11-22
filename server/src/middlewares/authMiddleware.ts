import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Request, Response, NextFunction, RequestHandler } from "express";

dotenv.config({ path: ".env" });

interface JWTPayload {
  userId: string,
  email: string,
  username: string
}


export interface CustomRequest extends Request {
  user?: JWTPayload
}


export const checkAuth = (req: CustomRequest, res: Response, next: NextFunction): void => {
  if (req.method === "OPTIONS") {
    return next();
  }
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      res.status(401).json({ message: "Unauthorized: No token provided" });
      return
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      res.status(401).json({ message: "Unauthorized: Invalid token format" });
      return
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY as string);

    req.user = decoded as JWTPayload
    next();
  } catch (err: any) {
    res.status(401).json(err);
  }
}
