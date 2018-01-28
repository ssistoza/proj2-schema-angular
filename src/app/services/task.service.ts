import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Http, Response } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ScrumUser } from '../models/scrumUser.model';
import { Board } from '../models/board.model';
import { Swimlane } from '../models/swimlane.model';

import { Story } from '../models/story.model';
import { Task } from '../models/task.model';

const httpOptions = { // headers for the POST
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class TaskService{

   getTaskUrl = `http://localhost:8090/scrumhub/api/dev/task/`;  // maybe user enviroment variables.. maybe
   createTaskUrl = `http://localhost:8090/scrumhub/api/dev/task/create`;
   updateTaskUrl = 'http://localhost:8090/scrumhub/api/dev/task/update';
   deleteTaskUrl = 'http://localhost:8090/scrumhub/api/dev/task/delete';
  

  constructor(private httpPost: HttpClient, private httpGet: Http) { } // User HTTP for retreiving JSON

  getTask(id: number): Observable<Task> {
    return this.httpGet
        .get(this.getTaskUrl + id)
        .map( (response: Response) => {
          return <Task> response.json();
        });
  }

    
    createTask (task: Task): Observable<Task> {
      return this.httpPost.post<Task>(this.createTaskUrl, JSON.stringify(task), httpOptions);
    }

    updateTask (task: Task): Observable<Task> {
      return this.httpPost.post<Task>(this.updateTaskUrl, JSON.stringify(task), httpOptions);
    }

    deleteTask (task: Task): Observable<Task>{
        return this.httpPost.post<Task>(this.deleteTaskUrl, JSON.stringify(task), httpOptions);
    }

}
