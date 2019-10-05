export class Organization {
    Id: number;
    name: string;
    contact: string;
    phone: string;
    address: string;
    comments: string;
    email: string;
    constructor(id: number, name: string, contact: string, phone: string, address: string, comments: string, email: string) {
        this.Id = id;
        this.name = name;
        this.contact = contact;
        this.phone = phone;
        this.address = address;
        this.comments = comments;
        this.email = email;
    }
}