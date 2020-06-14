export class Organization {
    Id: number;
    Name: string;
    Contact: string;
    Phone: string;
    Address: string;
    Comments: string;
    email: string;
    show: boolean;
    constructor(name: string, contact: string, phone: string, address: string, comments: string, email: string) {
        this.Name = name;
        this.Contact = contact;
        this.Phone = phone;
        this.Address = address;
        this.Comments = comments;
        this.email = email;
        this.show = false;
    }
}
