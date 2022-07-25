export interface Profile {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumbers: PhoneNumber[];
}

export interface PhoneNumber {
    number: string;
}