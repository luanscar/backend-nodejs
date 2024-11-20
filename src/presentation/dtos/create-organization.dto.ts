export interface CreateOrganizationInputDTO {
    name: string;
    domain?: string;
    shouldAttachUsersByDomain: boolean;
    ownerId: string;
}
