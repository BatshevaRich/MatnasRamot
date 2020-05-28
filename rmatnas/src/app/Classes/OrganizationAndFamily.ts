export class OrganizationAndFamily {
    Id: number;
    IdFamily: number;
    IdOrganization: number;
    IdCategory: number;
    Comments: string;
    dateAdded: string;

    constructor(id: number, idFamily: number, idOrganization: number, idCategory: number, comments: string, dateAdded: string) {
        this.Id = id;
        this.Comments = comments;
        this.IdCategory = idCategory;
        this.IdFamily = idFamily;
        this.IdOrganization = idOrganization;
        this.dateAdded = dateAdded;

    }
}
