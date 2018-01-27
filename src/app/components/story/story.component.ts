import { Component, Input, OnInit } from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { Task } from '../../models/task.model'

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.css']
})
export class StoryComponent implements OnInit{
  @Input() story;
  @Input() swimlane;

  todos: any[] = [];
  tasks: Task[] = [];
  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
    console.log(this.story);
    if(this.story != null){

      this.story.tasks.map( (obj: any) => {
        //console.log(obj);
        //(<Task> obj) = new Task(obj.taskId, obj.taskDescription, obj.taskTimestamp, obj.storyId, obj.taskActive);
        this.tasks.push(new Task(obj.taskId, obj.taskDescription, obj.taskTimestamp, obj.storyId, obj.taskActive));
      });
      console.log(JSON.stringify(this.tasks));
    
      if(this.story.tasks != undefined)
      {
        for (let i = 0; i < this.story.tasks.length; i++) {
          this.todos[i] = { text: `${this.story.tasks[i].taskDescription}`, deleted: (!this.story.tasks[i].taskActive)};
        }
      }
    }
  }

  deleteTodo(index: number) {
    this.todos.splice(index, 1);
  }

  toggleTaskActive(index: number)
  {
    //this.tasks[index].taskActive = !this.tasks[index].taskActive;
    console.log(this.tasks[index]);
  }
  deleteTask(index: number) {
    this.tasks.splice(index, 1);
    console.log(JSON.stringify(this.tasks));
  }

}
