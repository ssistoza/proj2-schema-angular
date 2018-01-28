import {NgModule} from '@angular/core';
import { Component, OnInit, } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { StoryComponent } from '../story/story.component';
import { ScrumUserAccountService } from '../../services/scrum-user-account.service';
import { ScrumUser } from '../../models/scrumUser.model';
import { SwimlaneComponent } from '../swimlane/swimlane.component';
import { ActivatedRoute } from '@angular/router';
import { Swimlane } from '../../models/swimlane.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-swimlanes',
  templateUrl: './swimlanes.component.html',
  styleUrls: ['./swimlanes.component.css'],
})
export class SwimlanesComponent implements OnInit {
  public scrumUser: ScrumUser;
<<<<<<< HEAD
  public swimlanes: Swimlane;
  points: String[] = [];
=======
  public swimlanes: Swimlane[];
  public swimlaneIds: number[] = [];
  public swimlaneStoriesLength: number [] = [];
  public points: String[] = [];
>>>>>>> 50298359ceea5210b467cbdbbdf38f4378fa1739

  constructor(private modalService: NgbModal,
              private accountService: ScrumUserAccountService,
              private route: ActivatedRoute,
              public router: Router) { }

<<<<<<< HEAD
  newStory(event: Event) {   // opens story modal
    event.stopPropagation();
    const modalRef = this.modalService.open(StoryComponent);
    modalRef.componentInstance.story = null;
=======
  newStory(event: Event, swimlaneId: number, storiesLength: number) {   // opens story modal
    event.stopPropagation();
    const modalRef = this.modalService.open(StoryComponent);
    modalRef.componentInstance.story = null;
    modalRef.componentInstance.swimlaneId = swimlaneId;
    modalRef.componentInstance.storiesLength = storiesLength;
    modalRef.result.then(() => setTimeout(() => { this.getUserInfo(1); }, 300));
>>>>>>> 50298359ceea5210b467cbdbbdf38f4378fa1739
  }

  editSwimlane(swimlane) {
    const modalRef = this.modalService.open(SwimlaneComponent);
    modalRef.componentInstance.swimlane = swimlane;
<<<<<<< HEAD
=======
    modalRef.componentInstance.properties = [this.getBoardId(), Object.keys(this.swimlanes).length];
    modalRef.result.then(() => setTimeout(() => { this.getUserInfo(1); }, 600));
>>>>>>> 50298359ceea5210b467cbdbbdf38f4378fa1739
  }

  newSwimlane() {
    this.router.navigated = false;
    const modalRef = this.modalService.open(SwimlaneComponent);
    modalRef.componentInstance.properties = [this.getBoardId(), Object.keys(this.swimlanes).length];
<<<<<<< HEAD
    modalRef.result.then(() => setTimeout(() => { this.getUserInfo(1);
                                                console.log('I was Closed'); }, 1000));
=======
    modalRef.result.then(() => setTimeout(() => { this.getUserInfo(1); }, 300));
  }

  shiftSwimlaneRight(event: Event, order: number) {
    event.stopPropagation();
    let s = this.swimlanes[order - 1].slOrder = order + 1;
    this.accountService.reorderSwimlane(this.swimlanes[order - 1]).subscribe(
      reorderService => this.swimlanes[order - 1] = reorderService
    );
    s = this.swimlanes[order].slOrder = order;
    this.accountService.reorderSwimlane(this.swimlanes[order]).subscribe(
      reorderService => this.swimlanes[order] = reorderService,
      error => console.log('Error: ', error), // log it on error...
      () => this.getUserInfo(1)
    );
  }

  shiftSwimlaneLeft(event: Event, order: number) {
    event.stopPropagation();
    let s = this.swimlanes[order - 1].slOrder = order - 1;
    this.accountService.reorderSwimlane(this.swimlanes[order - 1]).subscribe(
      reorderService => this.swimlanes[order - 1] = reorderService
    );
    s = this.swimlanes[order - 2].slOrder = order;
    this.accountService.reorderSwimlane(this.swimlanes[order - 2]).subscribe(
      reorderService => this.swimlanes[order - 2] = reorderService,
      error => console.log('Error: ', error), // log it on error...
      () => this.getUserInfo(1)
    );
    // console.log(s);
>>>>>>> 50298359ceea5210b467cbdbbdf38f4378fa1739
  }

  createRange() {   // made up function to create the bar sizes for the mobile view...
    this.points = [];
    for (let i = 0; i < Object.keys(this.swimlanes).length; i++) {
      let items = 0;
      for (let j = 0; j < Object.keys(this.swimlanes[i].stories).length; j++) {
        items = items + (Number(this.swimlanes[i].stories[j].points) / 3 + 1);
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

<<<<<<< HEAD

=======
>>>>>>> 50298359ceea5210b467cbdbbdf38f4378fa1739
  getUserInfo(userId: number) {
    this.accountService.getScrumUserAccount(userId).subscribe(
      (service) => this.scrumUser = service,
      error => console.log('Error: ', error), // log it on error...
      () => this.getCurrentSwimlane(this.getBoardId())
    );
  }

  getCurrentSwimlane (boardId: number) {
<<<<<<< HEAD
    for (let i = 0; i < Object.keys(this.scrumUser.associatedBoards).length; i++) {
      if (this.scrumUser.associatedBoards[i].sboard.bId === boardId) {
        this.swimlanes = this.scrumUser.associatedBoards[i].sboard.swimlanes;
      }
    }
    console.log(Object.keys(this.swimlanes).length);

=======
    this.swimlaneStoriesLength = [];
    this.swimlaneIds = [];
    for (let i = 0; i < Object.keys(this.scrumUser.associatedBoards).length; i++) {
      if (this.scrumUser.associatedBoards[i].sboard.bId === boardId) {
        this.swimlanes = this.scrumUser.associatedBoards[i].sboard.swimlanes;
        for (let j = 0; j < Object.keys(this.swimlanes).length; j++) {
          this.swimlaneIds.push(this.swimlanes[j].slId);
          this.swimlaneStoriesLength.push(this.swimlanes[j].stories.length);
        }
      }
    }
>>>>>>> 50298359ceea5210b467cbdbbdf38f4378fa1739
    this.createRange();
  }

  getBoardId(): number {
    const id = +this.route.snapshot.paramMap.get('id');
    return id;
  }

  ngOnInit() {
    this.getUserInfo(1);
  }
}
