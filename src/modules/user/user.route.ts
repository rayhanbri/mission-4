import { httpStatus } from "http-status";
import { NextFunction, Request, Response, Router } from "express";
import { userController } from "./user.controller";
import { jwtUtils } from "../../utils/jwtUtils";
import config from "../../config";
import { Role } from "../../../generated/prisma/enums";
import { sendResponse } from "../../utils/sendResponse";

const router = Router();

router.post("/register", userController.registerUser);

router.get(
  "/me",
  (req: Request, res: Response, next: NextFunction) => {
    const { accessToken } = req.cookies;

    const verifiedToken = jwtUtils.verifyToken(
      accessToken,
      config.jwt_access_secret,
    );

    if (typeof verifiedToken === "string") {
      throw new Error(verifiedToken);
    }

    const { email, name, id, role } = verifiedToken;
    const requiredRoles = [Role.ADMIN, Role.AUTHOR, Role.USER];

    if (requiredRoles.length && !requiredRoles.includes(role)) {
      res.send("this is forbidden ");
    }

    next();
  },
  userController.getMyProfile,
);

export const userRoutes = router;
