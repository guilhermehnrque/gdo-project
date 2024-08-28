export class InvitationUserDTO {
    public name: string;
    public surname: string;
    public email: string;
    public type: string;

    constructor(
        name: string,
        surname: string,
        email: string,
        type: string
    ) {
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.type = type;
    }
} 