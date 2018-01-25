import { Component, OnInit, Input  } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { StoryComponent } from '../story/story.component';
import { Swimlane } from '../../models/swimlane.model';

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.css']
})
export class StoriesComponent implements OnInit {

  @Input() lane: Swimlane;  // Recieved by it's module call on Swimlanes html
  @Input() userid: number;

  constructor(private modalService: NgbModal) { }

  open(event: Event, story) {
    event.stopPropagation();
    const modalRef = this.modalService.open(StoryComponent);
    modalRef.componentInstance.story = story;
  }

  ngOnInit() {
  }

}
