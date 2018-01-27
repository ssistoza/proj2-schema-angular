import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login/login.service';
import { ScrumUser } from '../../models/scrumUser.model';
import { Router } from '@angular/router';
import { AlertService} from '../../services/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loading: boolean;
  public scrumUser: ScrumUser;

  constructor(private newLoginService: LoginService, private router: Router, private alertService: AlertService) { }

  ngOnInit() {
    this.loading = false;
    this.newLoginService.logout();
  }


  login(username: string, password: string) {
    this.loading = true; 

    const tempUser = new ScrumUser(null, username, password, null, null, null, null);

    this.newLoginService.loginPost(tempUser).subscribe(
      one => {
        
        this.scrumUser = one;
        
        sessionStorage.setItem('userProfile', JSON.stringify(this.scrumUser));
        
        this.router.navigate(['home']);
      },
      error => {
        this.alertService.error(error);
        this.loading = false;
      });
  }
}
