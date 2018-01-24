import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Board } from '../models/board.model';
import { Observable } from 'rxjs/Observable';

const httpOptions = { // headers for the POST
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class AddBoardService {

newBoardUrl = 'http://localhost:8090/scrumhub/api/dev/board/create';
updateBoardUrl = 'http://localhost:8090/scrumhub/api/dev/board/update';

  constructor(private httpPost: HttpClient, private httpGet: Http) { }

  updateBoard (board: Board): Observable<Board> {
    return this.httpPost.post<Board>(this.updateBoardUrl, JSON.stringify(board), httpOptions);
  }

  addBoard (board: Board): Observable<Board> {
    return this.httpPost.post<Board>(this.newBoardUrl, JSON.stringify(board), httpOptions);
  }
}
