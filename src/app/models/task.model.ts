export class Task {

    taskId: number;
    taskDescription: string;
    taskTimestamp: number;
<<<<<<< HEAD
    storyId: number;
    taskActive: boolean;
=======
    story: number;
    isTaskActive: boolean;
>>>>>>> 50298359ceea5210b467cbdbbdf38f4378fa1739

    constructor(taskId: number,
        taskDescription: string,
        taskTimestamp: number,
<<<<<<< HEAD
        storyId: number,
        taskActive: boolean) {
=======
        story: number,
        isTaskActive: boolean) {
>>>>>>> 50298359ceea5210b467cbdbbdf38f4378fa1739

        this.taskId = taskId;
        this.taskDescription = taskDescription;
        this.taskTimestamp = taskTimestamp;
<<<<<<< HEAD
        this.storyId = storyId;
        this.taskActive = taskActive;

    }
=======
        this.story = story;
        this.isTaskActive = isTaskActive;

}
>>>>>>> 50298359ceea5210b467cbdbbdf38f4378fa1739
}
