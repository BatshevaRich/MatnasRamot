export class Event {
    id: number;
    description: string;
    date: string;
    constructor(id: number, description: string, date: string) {
        this.id = id;
        this.description = description;
        this.date = date;
    }
}