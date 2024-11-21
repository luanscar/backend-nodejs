export interface CreateOrganizationInputDTO {
	name: string;
	domain?: string;
	shouldAttachUsersByDomain: boolean;
	ownerId: string;
}

export interface CreateOrganizationoutputDTO {
	name: string;
	slug: string;
	domain?: string;
	shouldAttachUsersByDomain: boolean;
	ownerId: string;
}
