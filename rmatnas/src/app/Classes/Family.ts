export class Family {
    Id: number;
    FirstNameFather: string;
    FirstNameMother: string;
    LastName: string;
    Telephone: string;
    PelephoneFather: string;
    PelephoneMother: string;
    Address: string;
    // Email: string;
    Status: string;
    NumChildren: number;
    Reference: string;
    Reason: string;
    show: boolean;
    color: boolean;
    // tslint:disable-next-line: max-line-length
    constructor(fatherName: string, motherName: string, lastName: string, telephone: string, pfather: string, pmother: string, address: string, status: string, nChildren: number, reason: string, reference: string) {
        this.FirstNameFather = fatherName;
        this.FirstNameMother = motherName;
        this.LastName = lastName;
        this.Telephone = telephone;
        this.PelephoneFather = pfather;
        this.PelephoneMother = pmother;
        this.Address = address;
        // this.Email = email;
        this.Status = status;
        this.NumChildren = nChildren;
        this.Reference = reference;
        this.Reason = reason;
        this.show = false;
    }
}
