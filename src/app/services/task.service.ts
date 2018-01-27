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

   url = `http://localhost:8090/scrumhub/api/dev/task/`;  // maybe user enviroment variables.. maybe
  // newBoardUrl = `http://localhost:8090/scrumhub/api/dev/board/create`;
  // newSwimlaneUrl = `http://localhost:8090/scrumhub/api/dev/createSwimlane`;

  constructor(private httpPost: HttpClient, private httpGet: Http) { } // User HTTP for retreiving JSON

  getTask(id: number): Observable<Task> {
    return this.httpGet
        .get(this.url + id)
        .map( (response: Response) => {
          console.log(response.json());
          return <Task> response.json();
        });
  }

    /** POST: add a new board to the DB */
    // addBoard (board: Board): Observable<Board> {
    //   console.log('Hello');
    //   return this.httpPost.post<Board>(this.newBoardUrl, JSON.stringify(board), httpOptions);
    // }

    /** POST: add a new board to the DB */
    // addSwimlane (swimlane: Swimlane): Observable<Swimlane> {
    //   return this.httpPost.post<Swimlane>(this.newSwimlaneUrl, JSON.stringify(swimlane), httpOptions);
    // }

}
