import { Organization } from './Organization';
import { Family } from './Family';
import { Category } from './Category';

export class OrganizationAndFamily {
    Id: number;
    Family: Family;
    Organization: Organization;
    Category: Category;
    Comments: string;
    dateAdded: string;

    constructor(idFamily: Family, idOrganization: Organization, idCategory: Category, comments: string, dateAdded: string) {
        this.Comments = comments;
        this.Category = idCategory;
        this.Family = idFamily;
        this.Organization = idOrganization;
        this.dateAdded = dateAdded;

    }
}
