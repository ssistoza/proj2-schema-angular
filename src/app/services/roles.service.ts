import { Injectable } from '@angular/core';
import { Role } from '../models/role.model';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class RolesService {

  constructor(private httpGet: HttpClient) { }

  getAdmin () {

return this.httpGet.get<Role>(environment.roles.get(1));

  }
}
