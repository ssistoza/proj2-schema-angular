import { Story } from './story.model';
export class Task {

    task_id: number;
    task_description: string;
    task_timestamp: number;
    story_id: Story;
    is_task_active: boolean;

    constructor(task_id: number, task_description: string, task_timestamp: number, story_id: Story, is_task_active: boolean) {

        this.task_id = task_id;
        this.task_description = task_description;
        this.task_timestamp = task_timestamp;
        this.story_id = story_id;
        this.is_task_active = is_task_active;
    }
}
