export class Burndown {
    burnId: number;
    burnDate: number;
    boardId: number;
    burnedPoint: number;

    constructor(burnId: number,
        burnDate: number,
        boardId: number,
        burnedPoint: number) {

        this.burnId = burnId;
        this.burnDate = burnDate;
        this.boardId = boardId;
        this.burnedPoint = burnedPoint;
    }
}
