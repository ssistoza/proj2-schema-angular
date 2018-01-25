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
  styleUrls: ['./swimlanes.component.css']
})
export class SwimlanesComponent implements OnInit {
  public scrumUser: ScrumUser;
  public swimlanes: Swimlane;
  points: String[] = [];

  constructor(private modalService: NgbModal,
              private accountService: ScrumUserAccountService,
              private route: ActivatedRoute,
              public router: Router) { }

  newStory(event: Event) {   // opens story modal
    event.stopPropagation();
    const modalRef = this.modalService.open(StoryComponent);
    modalRef.componentInstance.story = null;
  }

  editSwimlane(swimlane) {
    const modalRef = this.modalService.open(SwimlaneComponent);
    modalRef.componentInstance.swimlane = swimlane;
  }

  newSwimlane() {
    this.router.navigated = false;
    const modalRef = this.modalService.open(SwimlaneComponent);
    modalRef.componentInstance.properties = [this.getBoardId(), Object.keys(this.swimlanes).length];
    modalRef.result.then(() => setTimeout(() => { this.getUserInfo(1);
                                                console.log('I was Closed'); }, 1000));
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


  getUserInfo(userId: number) {
    this.accountService.getScrumUserAccount(userId).subscribe(
      (service) => this.scrumUser = service,
      error => console.log('Error: ', error), // log it on error...
      () => this.getCurrentSwimlane(this.getBoardId())
    );
  }

  getCurrentSwimlane (boardId: number) {
    for (let i = 0; i < Object.keys(this.scrumUser.associatedBoards).length; i++) {
      if (this.scrumUser.associatedBoards[i].sboard.bId === boardId) {
        this.swimlanes = this.scrumUser.associatedBoards[i].sboard.swimlanes;
      }
    }
    console.log(Object.keys(this.swimlanes).length);

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
