export class Role {

    roleId: number;
    roleType: string;

    constructor(r_id: number, board_role_type: string) {
        this.roleId = r_id;
        this.roleType = board_role_type;
    }
}
