export class Volunteer {
    Id: number;
    Name: string;
    Telephone: string;
    Pelephone: string;
    Address: string;
    Email: string;
    Age: string;
    Comments: string;
    IsActive: boolean;

// tslint:disable-next-line: max-line-length
    constructor(id: number, Name: string, telephone: string, pelephone: string, email: string, address: string, birthdate: string) {
        this.Id = id;
        this.Name = Name;
        this.Telephone = telephone;
        this.Pelephone = pelephone;
        this.Address = address;
        this.Email = email;
        this.Age = birthdate;
        this.IsActive = true;
    }
}
    