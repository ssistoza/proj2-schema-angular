export class Task {

    taskId: number;
    taskDescription: string;
    taskTimestamp: number;
    story: number;
    isTaskActive: boolean;

    constructor(taskId: number,
        taskDescription: string,
        taskTimestamp: number,
        story: number,
        isTaskActive: boolean) {

        this.taskId = taskId;
        this.taskDescription = taskDescription;
        this.taskTimestamp = taskTimestamp;
        this.story = story;
        this.isTaskActive = isTaskActive;

    }
}
