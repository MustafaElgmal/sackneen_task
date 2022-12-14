import { verifyToken } from "../utils/functions";
import { User } from "../entities/user";
import { NextFunction, Response } from "express";
import { RequestAuthType } from "../types";
export const userAuth = async (
  req: RequestAuthType,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: "Please Authenticate!" });
  }
  try {
    const email = await verifyToken(authorization);
    const user = await User.findOne({ email});
    if (!user) {
      return res.status(401).json({ error: "User is not exites!" });
    }
    req.user = user;
    next();
  } catch (e) {
    res.status(401).json({ error: "Please vaild Authenticate!" });
  }
};
