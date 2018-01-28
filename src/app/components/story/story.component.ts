import { Component, Input, OnInit } from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { Task } from '../../models/task.model'
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.css']
})
export class StoryComponent implements OnInit{
  @Input() story;
  @Input() swimlane;

  tasks: Task[] = [];
  value: number = 0;
  max: number = 0;
  percentageDone: number = 0;

  descriptionField: string = "";

  constructor(public activeModal: NgbActiveModal,private taskService: TaskService) { }

  ngOnInit() {
    console.log(this.story);
    if(this.story != null){

      this.story.tasks.map( (obj: any) => {
        //console.log(obj);
        //(<Task> obj) = new Task(obj.taskId, obj.taskDescription, obj.taskTimestamp, obj.storyId, obj.taskActive);
        this.getTask(obj.taskId);
        this.calculatePercentageDone();

        //this.tasks.push(new Task(obj.taskId, obj.taskDescription, obj.taskTimestamp, obj.storyId, obj.taskActive));
        
      });
      //console.log(JSON.stringify(this.tasks));
    
    }
  }

  createTask(){
      console.log("we made it to createTask -component");
      console.log(this.descriptionField);
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
            console.log("we made it to createTask subscribe");

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
          //console.log("we made it to service condition");
        }
        this.max += 1;
        this.tasks.push(service);
        //console.log((<Task>service));
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
        console.log((<Task>service));
        
      }

    );
   
    //console.log(JSON.stringify(new Task(task.taskId,task.taskDescription,task.taskTimestamp,task.storyId,(!task.taskActive))));
  }

  deleteTask(index: number) {
    console.log("made it to deleteTask -component")
    let task = this.tasks[index];

    console.log(task)

    if((task.taskActive) == true)
    {
      this.value -= 1;
    }
    
    this.max -= 1;
    this.calculatePercentageDone();

    this.taskService.deleteTask(task).subscribe(
      service => {

        this.tasks[index] = service
        console.log(service);
        this.tasks.splice(index, 1);
        
      });

    

    
    
    //console.log(JSON.stringify(this.tasks));
  }

  calculatePercentageDone(){
    if(this.max > 0)
    {
      this.percentageDone = (this.value/this.max)*100;
    }
    else{
      this.percentageDone = 0;
    }
    console.log("PercentageDone: ", this.percentageDone);
  }

}
