import { Component, Input, OnInit } from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { ScrumUserAccountService } from '../../services/scrum-user-account.service';
import {Subject} from 'rxjs/Subject';
import {debounceTime} from 'rxjs/operator/debounceTime';
import {Router} from '@angular/router';
import { Story } from '../../models/story.model';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.css']
})
export class StoryComponent implements OnInit {
  @Input() story;
  @Input() stories;
  @Input() swimlaneId;
  @Input() storiesLength: number;
  @Input() laneIndex;
  @Input() swimlaneStoriesLength;
  @Input() swimlaneIds;

  public storyName: string;
  public checklistName: string;
  public points: number;

  private _alert = new Subject<string>();

  staticAlertClosed = false;
  alertMessage: string;


  constructor(public activeModal: NgbActiveModal, private accountService: ScrumUserAccountService, public router: Router) { }

  add() {
    this.router.navigated = false;
    if (this.storyName !== undefined && this.storyName.trim() !== ''
        && this.checklistName !== undefined && this.checklistName.trim() !== ''
        && this.points !== undefined) {
      this.story = new Story (null, this.points , this.storyName, this.checklistName, null, this.storiesLength + 1, this.swimlaneId, null);

      this.accountService.addStory(this.story)
        .subscribe(
          storyService => this.story = storyService,
          (error) => console.log('Error'),
          () => this.activeModal.close()
      );
    } else {
      this.changeAlertMessage(`Please fill in the inputs.`);
    }
  }

  update() {
    if (this.story.storyName !== undefined && this.story.storyName.trim() !== ''
        && this.story.checklistName !== undefined && this.story.checklistName.trim() !== ''
        && this.story.points !== undefined) {

      this.accountService.updateStory(this.story)
        .subscribe(
          storyService => this.story = storyService,
          (error) => console.log('Error'),
          () => this.activeModal.close()
      );
    } else {
      this.changeAlertMessage(`Please fill in the inputs.`);
    }
  }

  moveLeft(laneIndex) {
    const oldOrder =  this.story.storyOrder;
    this.story.slId = this.swimlaneIds[laneIndex - 1];
    this.story.storyOrder = (this.swimlaneStoriesLength[laneIndex - 1] + 1);
    this.accountService.moveStory(this.story).subscribe(
      reorderService => this.story = reorderService,
      (error) => console.log('Error'),
      () => this.adjustStoryOrders(oldOrder, laneIndex)
    );
  }

  moveRight(laneIndex) {
    const oldOrder =  this.story.storyOrder;
    this.story.slId = this.swimlaneIds[laneIndex + 1];
    this.story.storyOrder = (this.swimlaneStoriesLength[laneIndex + 1] + 1);
    this.accountService.moveStory(this.story).subscribe(
      reorderService => this.story = reorderService,
      (error) => console.log('Error'),
      () => this.adjustStoryOrders(oldOrder, laneIndex)
    );
  }

  adjustStoryOrders(currentIndex, laneIndex) {
    for (let i = currentIndex; i < this.swimlaneStoriesLength[laneIndex]; i++) {
      this.stories[i].storyOrder = (this.stories[i].storyOrder - 1);
      if (i < this.swimlaneStoriesLength[laneIndex] - 1) {
          this.accountService.reorderStory(this.stories[i]).subscribe(
          reorderService => this.stories[i] = reorderService,
          (error) => console.log('Error')
        );
      } else {
        this.accountService.reorderStory(this.stories[i]).subscribe(
          reorderService => this.stories[i] = reorderService,
          (error) => console.log('Error'),
          () => this.activeModal.close()
        );
      }
    }
    this.activeModal.close();

  }

  ngOnInit(): void {
    setTimeout(() => this.staticAlertClosed = true, 2000);

    this._alert.subscribe((message) => this.alertMessage = message);
    debounceTime.call(this._alert, 5000).subscribe(() => this.alertMessage = null);
  }

  public changeAlertMessage(message) {
    this._alert.next(message);
  }
}
