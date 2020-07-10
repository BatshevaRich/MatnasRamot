import { Eventt } from './Eventt';
import { Volunteer } from './Volunteer';
import { Category } from './Category';

export class VolunteerAndEvent {
    Id: number;
    eventt: Eventt;
    volunteer: Volunteer;
    category: Category;
    Comments: string;
    dateAdded: string;

    constructor(eventt: Eventt, volunteer: Volunteer, category: Category, comments: string, dateAdded: string) {
        this.Comments = comments;
        this.category = category;
        this.eventt = eventt;
        this.volunteer = volunteer;
        this.dateAdded = dateAdded;

    }
}
