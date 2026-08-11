import { NextFunction, Request, Response } from "express";
import { auth } from "../lib/auth";

export enum userRole {
  USER = "USER",
  ADMIN = "ADMIN",
}

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        name: string;
        role: string;
        emailVerification: boolean;
      };
    }
  }
}

const authHeder = (...roles: userRole[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
        const session = await auth.api.getSession({
            headers: req.headers as any,
          });
          if (!session) {
            return res.status(401).json({
              success: false,
              message: "You are unauthorized",
            });
          }
          if (!session.user.emailVerified) {
            return res.status(403).json({
              success: false,
              message: "Email Verification required, Please verify your emil!",
            });
          }
      
          req.user = {
            id: session.user.id,
            email: session.user.email,
            name: session.user.name,
            role: session.user.role as string,
            emailVerification: session.user.emailVerified,
          };
      
          if (!roles.length && !roles.includes(req.user.role as userRole)) {
            return res.status(403).json({
              success: false,
              message: "Forbidden! You are don't access this resources.",
            });
          }
      
          next();
    } catch (error) {
        next(error)
    }
  };
};

export default authHeder