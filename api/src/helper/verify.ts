import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
const secret = Buffer.from("Zn8Q5tyZ/G1MHltc4F/gTkVJMlrbKiZt", "base64");

export async function verify(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const accessToken = authHeader.split(" ")[1];
    jwt.verify(accessToken, secret, (err, { username, access }) => {
      if (err) {
        return res.status(403).json("Token is not valid!");
      }
      next();
    });
  } else {
    res.status(401).json("You are not authenticated!");
  }
}
