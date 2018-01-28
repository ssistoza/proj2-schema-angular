export class Task {

    taskId: number;
    taskDescription: string;
    taskTimestamp: number;
    storyId: number;
    taskActive: boolean;

    constructor(taskId: number,
        taskDescription: string,
        taskTimestamp: number,
        storyId: number,
        taskActive: boolean) {

        this.taskId = taskId;
        this.taskDescription = taskDescription;
        this.taskTimestamp = taskTimestamp;
        this.storyId = storyId;
        this.taskActive = taskActive;

    }
}
