export class User {
id: number;
name: {
    firstName: string;
    lastName: string
};
email: string;
phone: string;
address: string;
password: {
    pwd: string;
    confirmPwd: string;
};
gender: string;
}
