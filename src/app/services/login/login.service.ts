import { Injectable } from '@angular/core';
import { ScrumUser } from '../../models/scrumUser.model';

import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()

export class LoginService{
  urlLogin = environment.user.login();

  public tempScrumUser: ScrumUser;

  constructor(private http: HttpClient) { }

  loginPost(user: ScrumUser): Observable<ScrumUser> {

    return this.http.post<ScrumUser>(this.urlLogin, user, httpOptions);
    }

  logout() {
      // remove user from session storage to log user out
      sessionStorage.removeItem('userProfile');
  }

}
