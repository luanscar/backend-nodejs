import express from "express";
const userRouter = express.Router();

userRouter.post("/", (request, response, next) => console.log("User Controller"));

export { userRouter };
