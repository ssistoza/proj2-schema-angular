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
   updateTaskUrl = `http://localhost:8090/scrumhub/api/dev/task/update`;
  // newSwimlaneUrl = `http://localhost:8090/scrumhub/api/dev/createSwimlane`;

  constructor(private httpPost: HttpClient, private httpGet: Http) { } // User HTTP for retreiving JSON

  getTask(id: number): Observable<Task> {
    return this.httpGet
        .get(this.getTaskUrl + id)
        .map( (response: Response) => {
          //console.log(response.json());
          return <Task> response.json();
        });
  }

    
    addTask (task: Task): Observable<Task> {
      console.log(task);
      return this.httpPost.post<Task>(this.createTaskUrl, JSON.stringify(task), httpOptions);
    }

    updateTask (task: Task): Observable<Task> {
      console.log("we made it to updateTask -service");
      
      return this.httpPost.post<Task>(this.updateTaskUrl, JSON.stringify(task), httpOptions);
    }

    /** POST: add a new board to the DB */
    // addSwimlane (swimlane: Swimlane): Observable<Swimlane> {
    //   return this.httpPost.post<Swimlane>(this.newSwimlaneUrl, JSON.stringify(swimlane), httpOptions);
    // }

}
