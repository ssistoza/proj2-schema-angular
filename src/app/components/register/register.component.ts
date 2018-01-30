import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../../services/register/register.service';
import { Router } from '@angular/router';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  public loading: boolean = false;
  public model: any = {};
  
  constructor(
    private newRegisterService: RegisterService,
    private router: Router,
    private alertService: AlertService) { }

  ngOnInit() {
  }

  register() {
    this.loading = true;
    this.newRegisterService.create(this.model)
        .subscribe(
            data => {
                this.alertService.success('Registration successful', true);
                this.router.navigate(['/login']);
            },
            error => {
                console.log(error);
                this.alertService.error('Registration Invalid');
                this.loading = false;
            });
  }
}
