export class Board {
    bId: number;
    bName: string;
    bTimestamp: number;

    constructor(b_id: number, b_name: string, b_timestamp: number) {
        this.bId = b_id;
        this.bName = b_name;
        this.bTimestamp = b_timestamp;
    }
}
