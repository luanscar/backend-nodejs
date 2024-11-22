import { get } from "node:http";
import {
  createOrganizationUseCase,
  deleteOrganizationUseCase,
  getOrganizationUseCase,
  getUserOrganizationUseCase,
  transferOrganizationUseCase,
} from "@application/use-cases";
import { OrganizationController } from "./organization.express.controller";

const organizationController = new OrganizationController(
  createOrganizationUseCase,
  getOrganizationUseCase,
  getUserOrganizationUseCase,
  deleteOrganizationUseCase,
  transferOrganizationUseCase
);

export { organizationController };
