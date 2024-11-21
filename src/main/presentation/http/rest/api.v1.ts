import { authRouter } from "@presentation/routes/auth.routes";
import { organizationRouter } from "@presentation/routes/organization.routes";
import express, { type Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { invalidPath } from "../middlewares/invalid-path.middleware";

const apiv1Router: Router = express.Router();

// apiv1Router.use("/users", userRouter);
apiv1Router.use("/auth", authRouter);
apiv1Router.use("/organization", authMiddleware, organizationRouter);

export { apiv1Router };
