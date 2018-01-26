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
    model: any = {};
    loading = false;

  public scrumUser: ScrumUser;

  constructor(private newLoginService: LoginService, private router: Router, private alertService: AlertService) { }

  ngOnInit() {
      // reset login status
     this.newLoginService.logout();

      // get return url from route parameters or default to '/'
      // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }


  login(username: string, password: string) {
    this.loading = true; // loading symbol when button is clicked
    
    const tempUser = new ScrumUser(null, username, password, null, null, null, null);
    console.log(tempUser);
    this.newLoginService.loginPost(tempUser).subscribe(
        one => {this.scrumUser = one;
        console.log(this.scrumUser);
        sessionStorage.setItem('userProfile', JSON.stringify(this.scrumUser));
        this.router.navigate(['home']);
    },
    error => {
        this.alertService.error(error);
        this.loading = false;
    });
    }

}
