import { BoardMember } from './boardMember.model';

export class ScrumUser {
    u_id: number;
    username: string;
    password: string;
    email: string;
    firstname: string;
    lastname: string;
    associatedBoards: BoardMember[];

    constructor(u_id: number, username: string, password: string,
        email: string, firstname: string, lastname: string, boards: BoardMember[]) {
        this.u_id = u_id;
        this.username = username;
        this.password = password;
        this.email = email;
        this.firstname = firstname;
        this.lastname = lastname;
        this.associatedBoards = boards;
    }
}
