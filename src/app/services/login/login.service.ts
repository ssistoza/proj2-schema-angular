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
// tslint:disable-next-line:one-line
export class LoginService{

  urlLogin = environment.user.login();

  public tempScrumUser: ScrumUser;

  constructor(private http: HttpClient) { }

  loginPost(user: ScrumUser): Observable<ScrumUser> {

    return this.http.post<ScrumUser>(this.urlLogin, user, httpOptions);
    }

/*   Observable<Response> ob = this.http.post(this.url, book, options);

  login(username: string, password: string) {
      return this.http.post<any>('/login', { username: username, password: password })
          .map(user => {
              // login successful if there's a jwt token in the response
              if (user && user.token) {
                  // store user details and jwt token in local storage to keep user logged in between page refreshes
                  localStorage.setItem('currentUser', JSON.stringify(user));
              }

              return user;
          });
  }

  logout() {
      // remove user from local storage to log user out
      localStorage.removeItem('currentUser');
  } */

}
