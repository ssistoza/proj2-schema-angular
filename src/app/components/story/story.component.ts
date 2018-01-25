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

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
    console.log(this.story);
    console.log(this.swimlane);
  }

}
