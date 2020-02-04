
export class VolunteerAndFamily {
    Id: number;
    IdFamily: number;
    IdVolunteer: number;
    IdCategory: number;
    Comments: string;
    dateAdded: string;
    /**
     *
     */
    constructor(id: number, idFamily: number, idVolunteer: number, idCategory: number, comments: string, dateAdded: string) {
        this.Id = id;
        this.Comments = comments;
        this.IdCategory = idCategory;
        this.IdFamily = idFamily;
        this.IdVolunteer = idVolunteer;
        this.dateAdded = dateAdded;

    }
}
