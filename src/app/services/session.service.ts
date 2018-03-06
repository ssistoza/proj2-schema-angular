import { Injectable, OnInit } from '@angular/core';

@Injectable()
export class SessionService {
  constructor() { }

  getScrumUserId() { 
    let jsonObject = JSON.parse(sessionStorage.getItem('userProfile'));
    return jsonObject.uId;
  }

  getLegalName() {
    let jsonObject = JSON.parse(sessionStorage.getItem('userProfile'));
    return (jsonObject.firstName + " " + jsonObject.lastName);
  }
}
