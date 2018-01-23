import {NgModule} from '@angular/core';
import { Component, OnInit, } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { StoryComponent } from '../story/story.component';

@Component({
  selector: 'app-swimlanes',
  templateUrl: './swimlanes.component.html',
  styleUrls: ['./swimlanes.component.css']
})
export class SwimlanesComponent implements OnInit {

   swimlanes: Object = [
    {
      swimlaneId: 1,
      name: 'To do...',
      stories: [
              {
                storyId: 1,
                text: 'Story 1',
                points: 8,
              },
              {
                storyId: 2,
                text: 'Story 2',
                points: 3,
              },
              {
                storyId: 3,
                text: 'Story 3',
                points: 10,
              }
            ]
    },
    {
      swimlaneId: 2,
      name: 'In progress...',
      stories: [
                {
                  storyId: 4,
                  text: 'Story 4',
                  points: 10,
                }
              ]
    },
    {
      swimlaneId: 3,
      name: 'Done...',
      stories: [
                {
                  storyId: 5,
                  text: 'Story 5',
                  points: 10,
                },
                {
                  storyId: 5,
                  text: 'Story 6',
                  points: 7,
                },
                {
                  storyId: 5,
                  text: 'Story 7',
                  points: 6,
                },
                {
                  storyId: 5,
                  text: 'Story 8',
                  points: 2,
                },
              ]
    }
  ];
  points: String[] = [];

  constructor(private modalService: NgbModal) { }

  open(story) {   // opens story modal
    const modalRef = this.modalService.open(StoryComponent);
    modalRef.componentInstance.story = story;
  }

  createRange() {   // made up function to create the bar sizes for the mobile view...
    for (let i = 0; i < Object.keys(this.swimlanes).length; i++) {
      let items = 0;
      for (let j = 0; j < Object.keys(this.swimlanes[i].stories).length; j++) {
        items = items + (Number(this.swimlanes[i].stories[j].points) / 3);
      }
      this.points.push(String(items));
    }
  }
  setStyles(amount) {
    const styles = {
        'height':  amount + 'px',
    };
    return styles;
}
  ngOnInit() {
    this.createRange();
  }

}
