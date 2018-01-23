import { SlStatus } from './slStatus.model';

export class Swimlane {

    sl_id: number;
    sl_name: string;
    sl_order: number;
    sl_status_id: SlStatus;
    b_id: number;

    constructor( sl_id: number, sl_name: string, sl_order: number, sl_status_id: SlStatus, b_id: number) {
        this.sl_id = sl_id;
        this.sl_name = sl_name;
        this.sl_order = sl_order;
        this.sl_status_id = sl_status_id;
        this.b_id = b_id;
    }
}
