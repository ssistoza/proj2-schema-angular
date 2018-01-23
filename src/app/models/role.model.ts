export class Role {

    r_id: number;
    board_role_type: string;

    constructor(r_id: number, board_role_type: string) {
        this.r_id = r_id;
        this.board_role_type = board_role_type;
    }
}
