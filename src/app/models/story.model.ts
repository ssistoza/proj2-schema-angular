import { Task } from './task.model';

export class Story {

    storyId: number;
    storyName: number;
    checklistName: string;
    doneStoryTimestamp: number;
    storyOrder: number;
    swimlane: number;
    tasks: Task;

}
