export class Eventt {
    Id: number;
    Description: string;
    DateAdded: string;
    constructor(id: number, description: string, date: string) {
        this.Id = id;
        this.Description = description;
        this.DateAdded = date;
    }
}
