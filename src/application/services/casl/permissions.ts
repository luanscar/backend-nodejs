import type { AbilityBuilder } from "@casl/ability";
import type { AppAbility } from "./ability.service";
import type { User } from "./models/user";
import type { Role } from "./roles";

type PermissionsByRole = (user: User, builder: AbilityBuilder<AppAbility>) => void;

export const permissions: Record<Role, PermissionsByRole> = {
	ADMIN(user, { can, cannot }) {
		can("manage", "all");

		cannot(["transfer_ownership", "update"], "Organization");
		can(["transfer_ownership", "update"], "Organization", {
			ownerId: { $eq: user.id },
		});
	},
	MODERATOR(user, { can }) {
		can("get", "User");
		can(["create", "get"], "Project");
		can(["update", "delete"], "Project", { ownerId: { $eq: user.id } });
	},
	USER(_, { can }) {
		can("manage", "Billing");
	},
};
