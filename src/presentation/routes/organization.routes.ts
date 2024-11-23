import {
	createOrganizationController,
	deleteOrganizationController,
	getMembershipController,
	getOrganizationController,
	getUserOrganizationsController,
	transferOrganizationController,
} from "@presentation/http/rest/controllers/organization";
import { createOrganizationMiddleware } from "@presentation/middlewares/organization/create-organization-input.middleware";
import express, { type NextFunction, type Request, type Response } from "express";

const organizationRouter = express.Router();

organizationRouter.post(
	"/create-organization",
	createOrganizationMiddleware,
	(request: Request, response: Response, next: NextFunction) =>
		createOrganizationController.createOrganization(request, response, next),
);

organizationRouter.get("/user-organizations", (request: Request, response: Response, next: NextFunction) =>
	getUserOrganizationsController.getUserOrganizations(request, response, next),
);

organizationRouter.get("/:slug", (request: Request, response: Response, next: NextFunction) =>
	getOrganizationController.getOrganization(request, response, next),
);

organizationRouter.get("/:slug/membership", (request: Request, response: Response, next: NextFunction) =>
	getMembershipController.getMembership(request, response, next),
);

organizationRouter.patch("/:slug/owner", (request: Request, response: Response, next: NextFunction) =>
	transferOrganizationController.transferOrganization(request, response, next),
);

organizationRouter.delete("/:slug", (request: Request, response: Response, next: NextFunction) =>
	deleteOrganizationController.deleteOrganization(request, response, next),
);

export { organizationRouter };
