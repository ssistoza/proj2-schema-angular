import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Board } from '../models/board.model';
import { Observable } from 'rxjs/Observable';
import {environment} from '../../environments/environment';

const httpOptions = { // headers for the POST
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class BoardService {

  constructor(private httpPost: HttpClient, private httpGet: Http) { }

  updateBoard (board: Board): Observable<Board> {
    return this.httpPost.post<Board>(environment.board.update(), JSON.stringify(board), httpOptions);
  }

  addBoard (board: Board): Observable<Board> {
    return this.httpPost.post<Board>(environment.board.create(), JSON.stringify(board), httpOptions);
  }
}
