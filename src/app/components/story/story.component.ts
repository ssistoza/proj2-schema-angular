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

  constructor(public activeModal: NgbActiveModal,private taskService: TaskService) { }

  ngOnInit() {
    console.log(this.story);
    if(this.story != null){

      this.story.tasks.map( (obj: any) => {
        //console.log(obj);
        //(<Task> obj) = new Task(obj.taskId, obj.taskDescription, obj.taskTimestamp, obj.storyId, obj.taskActive);
        if(obj.taskActive == true)
        {
          this.value += 1;
        }
        this.max += 1;

        this.tasks.push(new Task(obj.taskId, obj.taskDescription, obj.taskTimestamp, obj.storyId, obj.taskActive));
        //this.getTask(obj.taskId);
      });
      //console.log(JSON.stringify(this.tasks));
      
    
    }
  }


  getTask(id: number){
    this.taskService.getTask(id).subscribe(
      service => {
        //this.tasks.push(service);
        console.log((<Task>service));
      }

    );
  }

  updateTask(task: Task)
  {
    if((!task.taskActive) == true)
    {
      this.value += 1;
    }
    else{
      this.value -= 1;
    }

    //let json = JSON.stringify(new Task(task.taskId,task.taskDescription,task.taskTimestamp,task.storyId,(!task.taskActive)));

    console.log(this.taskService.updateTask(task));
    //console.log(JSON.stringify(new Task(task.taskId,task.taskDescription,task.taskTimestamp,task.storyId,(!task.taskActive))));
  }

  deleteTask(index: number) {
    if((this.tasks[index].taskActive) == true)
    {
      this.value -= 1;
    }

    this.max -= 1;

    this.tasks.splice(index, 1);
    
    console.log(JSON.stringify(this.tasks));
  }

}
