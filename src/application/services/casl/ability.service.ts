import { z } from "zod";
import { projectSubject } from "./subjects/project";
import { userSubject } from "./subjects/user";
import { organizationSubject } from "./subjects/organization";
import { inviteSubject } from "./subjects/invite";
import { billingSubject } from "./subjects/billing";
import { AbilityBuilder, type CreateAbility, createMongoAbility, type MongoAbility } from "@casl/ability";
import { permissions } from "./permissions";
import { userSchema, type User } from "./models/user";
import type { Role } from "./roles";

const appAbilitiesSchema = z.union([
	projectSubject,
	userSubject,
	organizationSubject,
	inviteSubject,
	billingSubject,
	z.tuple([z.literal("manage"), z.literal("all")]),
]);

type AppAbilities = z.infer<typeof appAbilitiesSchema>;

export type AppAbility = MongoAbility<AppAbilities>;
export const createAppAbility = createMongoAbility as CreateAbility<AppAbility>;

export function defineAbilityFor(user: User) {
	const builder = new AbilityBuilder(createAppAbility);

	if (typeof permissions[user.role] !== "function") {
		throw new Error(`Permissions for role ${user.role} not found.`);
	}

	permissions[user.role](user, builder);

	const ability = builder.build({
		detectSubjectType(subject) {
			return subject.__typename;
		},
	});

	ability.can = ability.can.bind(ability);
	ability.cannot = ability.cannot.bind(ability);

	return ability;
}

export function getUserPermissions(userId: string, role: Role) {
	const authUser = userSchema.parse({
		id: userId,
		role,
	});

	const ability = defineAbilityFor(authUser);

	return ability;
}
