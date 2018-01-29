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
import { BoardMemberComponent } from '../board-member/board-member.component';
import { SessionService } from '../../services/session.service';
import { BurndownComponent } from '../burndown/burndown.component';

@Component({
  selector: 'app-swimlanes',
  templateUrl: './swimlanes.component.html',
  styleUrls: ['./swimlanes.component.css'],
})
export class SwimlanesComponent implements OnInit {
  public scrumUser: ScrumUser;
  public swimlanes: Swimlane[];
  public swimlaneIds: number[] = [];
  public swimlaneStoriesLength: number [] = [];
  public points: String[] = [];
  public currentSlide: boolean[] = [];
  public currentSlide2: boolean[] = [true];
  public boardName: String;
  public role: Number;
  position: Number = 1;
  public completedPoints = 0;
  public totalPoints = 0;

  constructor(private modalService: NgbModal,
              private accountService: ScrumUserAccountService,
              private route: ActivatedRoute,
              public router: Router,
              private sessionService: SessionService) { }

    viewChart(event: Event) {
      event.stopPropagation();
      const modalRef = this.modalService.open(BurndownComponent);
      modalRef.componentInstance.remainingPoints = Math.abs(this.totalPoints - this.completedPoints);
    }

  newStory(event: Event, swimlaneId: number, storiesLength: number) {   // opens story modal
    event.stopPropagation();
    const modalRef = this.modalService.open(StoryComponent);
    modalRef.componentInstance.story = null;
    modalRef.componentInstance.swimlaneId = swimlaneId;
    modalRef.componentInstance.storiesLength = storiesLength;
    modalRef.componentInstance.swimlaneStoriesLength = storiesLength;
    modalRef.result.then(() => setTimeout(() => {
      this.getUserInfo(this.sessionService.getScrumUserId());
      this.currentSlide2 = this.currentSlide;
    }, 300));
  }

  editSwimlane(swimlane) {
    const modalRef = this.modalService.open(SwimlaneComponent);
    modalRef.componentInstance.swimlane = swimlane;
    modalRef.componentInstance.properties = [this.getBoardId(), Object.keys(this.swimlanes).length];
    modalRef.result.then(() => setTimeout(() => {
      this.getUserInfo(this.sessionService.getScrumUserId());
      this.currentSlide2 = this.currentSlide;
    }, 600));
  }

  newSwimlane() {
    this.router.navigated = false;
    const modalRef = this.modalService.open(SwimlaneComponent);
    console.log(this.getBoardId() + ' ' + Object.keys(this.swimlanes).length);
    modalRef.componentInstance.properties = [this.getBoardId(), Object.keys(this.swimlanes).length];
    modalRef.result.then(() => setTimeout(() => {
      this.getUserInfo(this.sessionService.getScrumUserId());
      this.currentSlide2 = this.currentSlide;
    }, 300));
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
      () => this.getUserInfo(this.sessionService.getScrumUserId())
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
      () => this.getUserInfo(this.sessionService.getScrumUserId())
    );
    // console.log(s);
  }

  addMemberModal() {
    const modalRef = this.modalService.open(BoardMemberComponent);
    modalRef.componentInstance.boardId = this.getBoardId();
  }

  cPrev2() {
    let temp;
    temp = [];
    for (let i = 0; i < this.currentSlide.length; i++) {
      const moveHere = (i + (this.currentSlide.length - 1)) % this.currentSlide.length;
      temp[moveHere] = this.currentSlide[i];
    }
    this.currentSlide = temp;
  }
  cNext2() {
    let temp;
    temp = [];
    let moveHere;
    for (let i = 0; i < this.currentSlide.length; i++) {
      moveHere = (i + (this.currentSlide.length + 1)) % this.currentSlide.length;
      temp[moveHere] = this.currentSlide[i];
      if ( temp[moveHere] === true) {
        this.position = moveHere + 1;
      }
    }
    this.currentSlide = temp;
  }

  createRange() {   // made up function to create the bar sizes for the mobile view...
    this.points = [];
    this.totalPoints = 0;
    this.completedPoints = 0;
    for (let i = 0; i < Object.keys(this.swimlanes).length; i++) {
      let items = 0;
      let points = 0;
      for (let j = 0; j < Object.keys(this.swimlanes[i].stories).length; j++) {
        items = items + (Number(this.swimlanes[i].stories[j].points) / 3 + 1);
        points +=  Number(this.swimlanes[i].stories[j].points);
        this.totalPoints += Number(this.swimlanes[i].stories[j].points);
      }
      if ( i === Object.keys(this.swimlanes).length - 1 ) {
          this.completedPoints += points;
      }
      this.points.push(String(items));
    }
    this.calculateBurnDownChart();
  }

  calculateBurnDownChart() {
    console.log(this.totalPoints);
    console.log(this.completedPoints);
  }

  setStyles(amount) {
    const styles = {
        'height':  amount + 'px',
    };
    return styles;
  }

  getUserInfo(userId: number) {
    this.accountService.getScrumUserAccount(userId).subscribe(
      (service) => this.scrumUser = service,
      error => console.log('Error: ', error), // log it on error...
      () => this.getCurrentSwimlane(this.getBoardId())
    );
  }

  getCurrentSwimlane (boardId: number) {
    this.swimlaneStoriesLength = [];
    this.swimlaneIds = [];
    for (let i = 0; i < Object.keys(this.scrumUser.associatedBoards).length; i++) {
      if (this.scrumUser.associatedBoards[i].sboard.bId === boardId) {
        this.boardName = this.scrumUser.associatedBoards[i].sboard.bName;
        this.swimlanes = this.scrumUser.associatedBoards[i].sboard.swimlanes;
        this.role = this.scrumUser.associatedBoards[i].memberRole.roleId;
        for (let j = 0; j < Object.keys(this.swimlanes).length; j++) {
          this.swimlaneIds.push(this.swimlanes[j].slId);
          this.swimlaneStoriesLength.push(this.swimlanes[j].stories.length);
          if (this.currentSlide.length !== Object.keys(this.swimlanes).length) {
            if (j === 0 && this.currentSlide.length === 0 ) {
              this.currentSlide.push(true);
            } else {
              this.currentSlide.push(false);
            }
          }
        }
      }
    }
    this.createRange();
  }

  getBoardId(): number {
    const id = +this.route.snapshot.paramMap.get('id');
    return id;
  }

  ngOnInit() {
    this.getUserInfo(this.sessionService.getScrumUserId());
  }
}
