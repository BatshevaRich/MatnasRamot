export class VolunteerAndEvent {
    Id: number;
    IdEvent: number;
    IdVolunteer: number;
    IdCategory: number;
    Comments: string;
    dateAdded: string;
    /**
     *
     */
    constructor(id: number, idEvent: number, idVolunteer: number, idCategory: number, comments: string, dateAdded: string) {
        this.Id = id;
        this.Comments = comments;
        this.IdCategory = idCategory;
        this.IdEvent = idEvent;
        this.IdVolunteer = idVolunteer;
        this.dateAdded = dateAdded;

    }
}
