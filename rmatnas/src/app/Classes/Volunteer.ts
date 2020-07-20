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
    show: boolean;
    // tslint:disable-next-line: max-line-length
    constructor(Name: string, telephone: string, pelephone: string, email: string, address: string, birthdate: string, isActive: boolean) {
        this.Name = Name;
        this.Telephone = telephone;
        this.Pelephone = pelephone;
        this.Address = address;
        this.Email = email;
        this.Age = birthdate;
        this.IsActive = isActive;
        this.show = false;
    }

    public CalculateAge() {
        const birthday = new Date(this.Age);
        const timeDiff = Math.abs(Date.now() - birthday.getTime());
        return Math.floor((timeDiff / (1000 * 3600 * 24)) / 365.25);
    }
}
