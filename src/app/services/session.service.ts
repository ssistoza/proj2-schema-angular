import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { ScrumUser } from '../models/scrumUser.model';
import { Response } from '@angular/http';

@Injectable()
export class SessionService {
  constructor(private http: HttpClient) { }

  getScrumUserId() { 
    let jsonObject = JSON.parse(sessionStorage.getItem('userProfile'));
    return jsonObject.uId;
  }

  getLegalName() {
    let jsonObject = JSON.parse(sessionStorage.getItem('userProfile'));
    return (jsonObject.firstName + " " + jsonObject.lastName);
  }

  getUserProfile() {
    let jsonObject = JSON.parse(sessionStorage.getItem('userProfile'));
    return jsonObject;
      }
}
