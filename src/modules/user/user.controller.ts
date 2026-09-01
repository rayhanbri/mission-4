import httpStatus from "http-status";
import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";
import bcrypt from "bcryptjs";
import config from "../../config";
import { userService } from "./user.service";

const registerUser = async (req: Request, res: Response) => {
  const payload = req.body;

  const user = await userService.registerUserIntoDB(payload);

  // console.log(payload);
  //if anything change in schema
  //1.npx prisma migrate dev
  //2. npx prisma generate

  res.status(httpStatus.CREATED).json({
    success: true,
    statusCode: httpStatus.CREATED,
    message: "User registered successfully",
    data: {
      user,
    },
  });
};

export const userController = {
  registerUser,
};
