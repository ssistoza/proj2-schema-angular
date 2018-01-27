import { Story } from './story.model';
import { SlStatus } from './slStatus.model';

export class Swimlane {
    slId: number;
    slName: string;
    slOrder: number;
    slStatus: SlStatus;
    boardKey: number;
    stories: Story[];

    constructor(slId: number,
        slName: string,
        slOrder: number,
        slStatus: SlStatus,
        boardKey: number,
        stories: Story) {

        this.slId = slId;
        this.slName = slName;
        this.slOrder = slOrder;
        this.slStatus = slStatus;
        this.boardKey = boardKey;
}
