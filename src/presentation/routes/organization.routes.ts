import { organizationController } from "@presentation/http/rest/controllers/organization";
import { createOrganizationMiddleware } from "@presentation/middlewares/organization/create-organization-input.middleware";
import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";

const organizationRouter = express.Router();

organizationRouter.post(
  "/create-organization",
  createOrganizationMiddleware,
  (request: Request, response: Response, next: NextFunction) =>
    organizationController.createOrganization(request, response, next)
);
organizationRouter.patch(
  "/:slug/owner",
  (request: Request, response: Response, next: NextFunction) =>
    organizationController.transferOrganization(request, response, next)
);

organizationRouter.get(
  "/:slug/membership",
  (request: Request, response: Response, next: NextFunction) =>
    organizationController.getMembership(request, response, next)
);

organizationRouter.get(
  "/organizations",
  (request: Request, response: Response, next: NextFunction) =>
    organizationController.getOrganization(request, response, next)
);

organizationRouter.get(
  "/:slug",
  (request: Request, response: Response, next: NextFunction) =>
    organizationController.getOrganization(request, response, next)
);
organizationRouter.delete(
  "/:slug",
  (request: Request, response: Response, next: NextFunction) =>
    organizationController.deleteOrganization(request, response, next)
);

organizationRouter.get(
  "/user-organizations",
  (request: Request, response: Response, next: NextFunction) =>
    organizationController.getOrganizationsByUserId(request, response, next)
);
export { organizationRouter };
