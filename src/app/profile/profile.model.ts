export interface Profile {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumbers: [
        {
            number: string;
        },
        {
            number: string;
        },
        {
            number: string;
        }
    ]
}
