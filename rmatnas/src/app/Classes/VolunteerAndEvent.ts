import { Eventt } from './Eventt';
import { Volunteer } from './Volunteer';
import { Category } from './Category';

export class VolunteerAndEvent {
    Id: number;
    Event: Eventt;
    Volunteer: Volunteer;
    Category: Category;
    Comments: string;
    DateAdded: string;

    constructor(event: Eventt, volunteer: Volunteer, category: Category, comments: string, dateAdded: string) {
        this.Comments = comments;
        this.Category = category;
        this.Event = event;
        this.Volunteer = volunteer;
        this.DateAdded = dateAdded;

    }
}
