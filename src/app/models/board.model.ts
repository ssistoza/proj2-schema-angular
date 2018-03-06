import { Swimlane } from './swimlane.model';

export class Board {
    bId: number;
    bName: string;
    bTimestamp: number;
    swimlanes: Swimlane[];

    constructor(b_id: number, b_name: string, b_timestamp: number, b_swimlane: Swimlane[]) {
        this.bId = b_id;
        this.bName = b_name;
        this.bTimestamp = b_timestamp;
        this.swimlanes = b_swimlane;
    }
}
