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
<<<<<<< HEAD
    }
=======
}
>>>>>>> 50298359ceea5210b467cbdbbdf38f4378fa1739
}
