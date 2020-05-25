import { Family } from './Family';
import { Volunteer } from './Volunteer';
import { Category } from './Category';

export class VolunteerAndFamily {
    Id: number;
    Family: Family;
    Volunteer: Volunteer;
    Category: Category;
    Comments: string;
    DateAdded: string;
    /**
     *
     */
    constructor(family: Family, myvolunteer: Volunteer, category: Category, comments: string, dateAdded: string) {
        this.Comments = comments;
        this.Category = category;
        this.Family = family;
        this.Volunteer = myvolunteer;
        this.DateAdded = dateAdded;

    }
}
