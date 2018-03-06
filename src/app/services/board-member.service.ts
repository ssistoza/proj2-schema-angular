import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BoardMember } from '../models/boardMember.model';
import { BoardComponent } from '../components/board/board.component';
import {environment} from '../../environments/environment';
import { Observable } from 'rxjs/Observable';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class BoardMemberService {

  constructor(private httpPost: HttpClient) { }

  createBoardMember (boardMember: BoardMember): Observable<BoardMember> {
    return this.httpPost.post<BoardMember>(environment.boardmember.create(), JSON.stringify(boardMember), httpOptions);
  } 





}
