import { Swimlane } from './swimlane.model';

export class Story {
story_id: number;
story_name: string;
points: number;
checklist_name: string;
done_story_timestamp: number;
story_order: number;
swimlane: Swimlane;

    constructor(story_id: number, story_name: string, points: number, checklist_name: string, done_story_timestamp: number,
    story_order: number, swimlane: Swimlane) {
        this.story_id = story_id;
        this.story_name = story_name;
        this.points = points;
        this.checklist_name = checklist_name;
        this.done_story_timestamp = done_story_timestamp;
        this.story_order = story_order;
        this.swimlane = swimlane;
    }
}
