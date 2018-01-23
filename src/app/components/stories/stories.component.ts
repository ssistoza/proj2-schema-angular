import { Component, OnInit, Input  } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { StoryComponent } from '../story/story.component';

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.css']
})
export class StoriesComponent implements OnInit {

  @Input() lane: Object;  // Recieved by it's module call on Swimlanes html
  @Input() userid: number;

  constructor(private modalService: NgbModal) { }

  open(story) {
    const modalRef = this.modalService.open(StoryComponent);
    modalRef.componentInstance.story = story;
  }

  ngOnInit() {
  }

}
