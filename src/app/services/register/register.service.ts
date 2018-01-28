import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ScrumUser } from '../../models/scrumUser.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class RegisterService {
  urlRegister = environment.user.create();
  constructor(private http: HttpClient) { }
  
  public tempScrumUser: ScrumUser;

  create(tempScrumUser: ScrumUser) {
    return this.http.post(this.urlRegister, tempScrumUser);
  }
}
