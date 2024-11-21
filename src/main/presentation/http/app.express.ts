import compression from "compression";
import express, { type Application } from "express";
import helmet from "helmet";
import { customMorgan } from "./middlewares/custom-morgan.middleware";
import { errorLogger } from "./middlewares/error-logger.middleware";
import { errorResponder } from "./middlewares/error-responser.middleware";
import { invalidPath } from "./middlewares/invalid-path.middleware";
import { apiv1Router } from "./rest/api.v1";

const createExpressApplication = async (): Promise<Application> => {
	const app: Application = express();

	app.disable("x-powered-by");

	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));

	app.use(helmet());
	app.use(compression());

	app.use(customMorgan);
	app.use("/api/v1", apiv1Router);

	app.use(invalidPath);
	app.use(errorLogger);
	app.use(errorResponder);

	return app;
};

export { createExpressApplication };
