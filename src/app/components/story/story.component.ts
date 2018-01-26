import { Component, Input, OnInit } from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.css']
})
export class StoryComponent implements OnInit{
  @Input() story;
  @Input() swimlane;

  todos: any[] = [];

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
    console.log(this.story.tasks);
    for (let i = 0; i < this.story.tasks.length; i++) {
      this.todos[i] = { text: `${this.story.tasks[i].taskDescription}`, deleted: (!this.story.tasks[i].taskActive)};
    }
  }

  deleteTodo(index: number) {
    this.todos.splice(index, 1);
  }

}
