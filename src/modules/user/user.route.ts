import { Request, Response, Router } from "express";
import { userController } from "./user.controller";

const router = Router();

router.post("/register", userController.registerUser);

router.get(
  "/me",
  (req: Request, res: Response) => {
    res.send("i am middleware");
  },
  userController.getMyProfile,
);

export const userRoutes = router;
