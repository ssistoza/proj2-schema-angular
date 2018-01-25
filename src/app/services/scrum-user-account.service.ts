import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Http, Response } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ScrumUser } from '../models/scrumUser.model';
import { Board } from '../models/board.model';
import { Swimlane } from '../models/swimlane.model';

const httpOptions = { // headers for the POST
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ScrumUserAccountService {

  url = `http://localhost:8090/scrumhub/api/dev/user/`;  // maybe user enviroment variables.. maybe
  newBoardUrl = `http://localhost:8090/scrumhub/api/dev/board/create`;
  newSwimlaneUrl = `http://localhost:8090/scrumhub/api/dev/createSwimlane`;

  constructor(private httpPost: HttpClient, private httpGet: Http) { } // User HTTP for retreiving JSON

  getScrumUserAccount(id: number): Observable<ScrumUser> {
    return this.httpGet
        .get(this.url + id)
        // must import Response datatype
        .map( (response: Response) => {
          console.log(response);
          return <ScrumUser> response.json();
        });
  }

    /** POST: add a new board to the DB */
    addBoard (board: Board): Observable<Board> {
      console.log('Hello');
      return this.httpPost.post<Board>(this.newBoardUrl, JSON.stringify(board), httpOptions);
    }

    /** POST: add a new board to the DB */
    addSwimlane (swimlane: Swimlane): Observable<Swimlane> {
      return this.httpPost.post<Swimlane>(this.newSwimlaneUrl, JSON.stringify(swimlane), httpOptions);
    }

}
