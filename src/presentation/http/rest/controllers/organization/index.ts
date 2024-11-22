import {
	createOrganizationUseCase,
	getOrganizationUseCase,
	getUserOrganizationsUseCase,
	transferOrganizationUseCase,
} from "@application/use-cases";
import { GetUserOrganizationsExpressController } from "./get-user-organizations.express.controller";
import { GetOrganizationExpressController } from "./get-organization.express.controller";
import { CreateOrganizationExpressController } from "./create-organization.express.controller.ts";
import { GetMembershipExpressController } from "./get-membership.express.controller";
import { TransferOrganizationExpressController } from "./transfer-organization.express.controller";

const createOrganizationController = new CreateOrganizationExpressController(createOrganizationUseCase);
const getUserOrganizationsController = new GetUserOrganizationsExpressController(getUserOrganizationsUseCase);
const getOrganizationController = new GetOrganizationExpressController(getOrganizationUseCase);
const getMembershipController = new GetMembershipExpressController();
const transferOrganizationController = new TransferOrganizationExpressController(transferOrganizationUseCase);

export {
	createOrganizationController,
	getUserOrganizationsController,
	getOrganizationController,
	getMembershipController,
	transferOrganizationController,
};
