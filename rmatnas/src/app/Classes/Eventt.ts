export class Eventt {
    Id: number;
    Name: string;
    Description: string;
    StartDate: string;
    EndDate: string;
    DateAdded: string;
    show: boolean;
    constructor(name: string, description: string, date: string, startDate: string, endDate: string) {
        this.Name = name;
        this.Description = description;
        this.DateAdded = date;
        this.StartDate = startDate;
        this.EndDate = endDate;
        this.show = false;
    }
}
