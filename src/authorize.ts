import { Request, Response, NextFunction } from "express";
import passport from "passport";

const authorize = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  passport.authenticate("jwt", { session: false }, (err: any, user: any) => {
    if (!user || err) {
      response.status(401).json({ message: "Unathorized" });
    } else {
      request.user = user;
      next();
    }
  })(request, response, next);
};

export default authorize;
