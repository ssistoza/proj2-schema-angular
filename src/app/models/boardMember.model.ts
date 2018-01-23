import { Board } from './board.model';
import { ScrumUser } from './scrumUser.model';
import { Role } from './role.model';

export class BoardMember {

    sboard: Board;
    boardMemberId: number;
    memberRole: Role;

    constructor(b_id: Board, u_id: number, r_id: Role) {
        this.sboard = b_id;
        this.boardMemberId = u_id;
        this.memberRole = r_id;
    }
}
