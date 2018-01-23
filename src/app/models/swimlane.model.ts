
export class Swimlane {

    sl_id: number;
    sl_name: string;
    sl_order: number;
    b_id: number;

    constructor( sl_id: number, sl_name: string, sl_order: number, b_id: number) {
        this.sl_id = sl_id;
        this.sl_name = sl_name;
        this.sl_order = sl_order;
        this.b_id = b_id;
    }
}
