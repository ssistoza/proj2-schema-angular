import { Task } from './task.model';

export class Story {

    storyId: number;
    storyName: string;
    points: number;
    checklistName: string;
    doneStoryTimestamp: number;
    storyOrder: number;
    swimlane: number;
    tasks: Task;

    constructor(storyId: number, points: number, storyName: string, checklistName: string, doneStoryTimestamp: number,
        storyOrder: number, swimlane: number, tasks: Task) {

        this.storyId = storyId;
        this.storyName = storyName;
        this.points = points;
        this.checklistName = checklistName;
        this.doneStoryTimestamp = doneStoryTimestamp;
        this.storyOrder = storyOrder;
        this.swimlane = swimlane;
        this.tasks = tasks;

    }

}
