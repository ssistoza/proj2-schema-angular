import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Burndown } from '../models/burndown.model';
import { Observable } from 'rxjs/Observable';

const httpOptions = { // headers for the POST
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable()
export class BurndownService {

  constructor(private httpPost: HttpClient) { }

  updateBurndownPoint(BurndownPoint: Burndown): Observable<Burndown> {
    console.log(BurndownPoint.burnId);
    return this.httpPost.post<Burndown>(environment.burndown.update(), JSON.stringify(BurndownPoint), httpOptions);
  }
  insertBurndownPoint(BurndownPoint: Burndown): Observable<Burndown> {
    return this.httpPost.post<Burndown>(environment.burndown.create(), JSON.stringify(BurndownPoint), httpOptions);
  }

}
