import { Component, Input, OnInit } from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';
import { ScrumUserAccountService } from '../../services/scrum-user-account.service';
import {Subject} from 'rxjs/Subject';
import {debounceTime} from 'rxjs/operator/debounceTime';
import {Router} from '@angular/router';
import { Story } from '../../models/story.model';
import { BurndownService } from '../../services/burndown.service';
import { Burndown } from '../../models/burndown.model';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.css']
})
export class StoryComponent implements OnInit {
  @Input() story;
  @Input() stories;
  @Input() swimlane;
  @Input() swimlaneId;
  @Input() storiesLength: number;
  @Input() laneIndex;
  @Input() swimlaneStoriesLength = [];
  @Input() swimlaneIds;
  @Input() myRole;
  @Input() burndown;
  @Input() remaining;
  @Input() boardId;
  public storyName: string;
  public checklistName: string;
  public points: number;

  private _alert = new Subject<string>();

  staticAlertClosed = false;
  alertMessage: string;


  tasks: Task[] = [];
  value: number = 0;
  max: number = 0;
  percentageDone: number = 0;

  descriptionField: string = "";

  constructor(public activeModal: NgbActiveModal,
    private accountService: ScrumUserAccountService,
    public router: Router,
    private taskService: TaskService,
    private burndownService: BurndownService
  ) { }

  ngOnInit() {

    setTimeout(() => this.staticAlertClosed = true, 2000);

    this._alert.subscribe((message) => this.alertMessage = message);
    debounceTime.call(this._alert, 5000).subscribe(() => this.alertMessage = null);

    if(this.story != null){

      this.story.tasks.map( (obj: any) => {
        this.getTask(obj.taskId);
        this.calculatePercentageDone();
      });
      
    
    }
  }

  createTask(){

      if(this.descriptionField != null){

        let task = new Task(0,this.descriptionField,null,this.story.storyId,false);

        if(task.taskActive == true)
        {
          this.value += 1;
        }
        this.max += 1;
        this.calculatePercentageDone();

        this.taskService.createTask(task).subscribe(
          service => {

            this.tasks.push(service);
            this.story.tasks = this.tasks;

            this.descriptionField = "";
            
          }

        );
      }

  }

  getTask(id: number){
    
    this.taskService.getTask(id).subscribe(
      service => {
        if(service.taskActive == true)
        {
          this.value += 1;
         
        }
        this.max += 1;
        this.tasks.push(service);
        this.calculatePercentageDone();
      }

    );
  }

  checkTask(index: number)
  {
    let task = this.tasks[index];

    if((!task.taskActive) == true)
    {
      this.value += 1;
    }
    else{
      this.value -= 1;
    }

    this.calculatePercentageDone();

    let json = new Task(task.taskId,task.taskDescription,task.taskTimestamp,task.storyId,(!task.taskActive));
    this.taskService.updateTask(json).subscribe(
      service => {

        this.tasks[index] = service
        
      }

    );
   
  }

  deleteTask(index: number) {
    
    let task = this.tasks[index];


    if((task.taskActive) == true)
    {
      this.value -= 1;
    }
    
    this.max -= 1;
    this.calculatePercentageDone();

    this.taskService.deleteTask(task).subscribe(
      service => {

        this.tasks[index] = service
        this.tasks.splice(index, 1);
        
      });

  }

  calculatePercentageDone(){
    if(this.max > 0)
    {
      this.percentageDone = (this.value/this.max)*100;
    }
    else{
      this.percentageDone = 0;
    }
  }


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
          () => { this.activeModal.close(); }
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
      () => {
        if ( this.swimlaneStoriesLength.length === laneIndex + 1 && this.burndown !== 0 ) {
          const today = new Date(Date.now());
          const dateStr = today.toDateString().substr(4, 7);
          const lastBurnDate = new Date(this.burndown[(this.burndown.length - 1)].burnDate);
          const lastBd = lastBurnDate.toDateString().substr(4, 7);
          if (dateStr === lastBd) {
            let newBurnPoints = new Burndown(this.burndown[(this.burndown.length - 1)].burnId,
                                            null, this.boardId, (this.remaining + this.story.points));
            this.burndownService.updateBurndownPoint(newBurnPoints).subscribe(
                (service) => newBurnPoints = service
            );
          } else {
            let newBurnPoints = new Burndown(null, null, this.boardId, (this.remaining + this.story.points));
            this.burndownService.insertBurndownPoint(newBurnPoints).subscribe(
                (service) => newBurnPoints = service
            );
          }
        }
        this.adjustStoryOrders(oldOrder, laneIndex);
      }
    );
  }

  moveRight(laneIndex) {
    const oldOrder =  this.story.storyOrder;
    this.story.slId = this.swimlaneIds[laneIndex + 1];
    this.story.storyOrder = (this.swimlaneStoriesLength[laneIndex + 1] + 1);
    this.accountService.moveStory(this.story).subscribe(
      reorderService => this.story = reorderService,
      (error) => console.log('Error'),
      () => {
        if ( this.swimlaneStoriesLength.length === laneIndex + 2 && this.burndown !== 0 ) {
          const today = new Date(Date.now());
          const dateStr = today.toDateString().substr(4, 7);
          const lastBurnDate = new Date(this.burndown[(this.burndown.length - 1)].burnDate);
          const lastBd = lastBurnDate.toDateString().substr(4, 7);
          if (dateStr === lastBd) {
            let newBurnPoints = new Burndown(this.burndown[(this.burndown.length - 1)].burnId,
                                            null, this.boardId, (this.remaining - this.story.points));
            this.burndownService.updateBurndownPoint(newBurnPoints).subscribe(
                (service) => newBurnPoints = service
            );
          } else {
            const newBurnPoints = new Burndown(null, null, this.boardId, (this.remaining - this.story.points));
            this.burndownService.insertBurndownPoint(newBurnPoints).subscribe(

            );
          }
        }
        this.adjustStoryOrders(oldOrder, laneIndex);
      }
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


  public changeAlertMessage(message) {
    this._alert.next(message);
  }
}
