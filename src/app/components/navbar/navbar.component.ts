import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../../services/navbar/navbar.service';
import { AuthGuard } from '../../services/auth.guard';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private navService: NavbarService, private guard: AuthGuard, private router: Router) { }
  ngOnInit() {}

  logoutNavbar() {
    this.navService.hide();
    // remove user from session storage to log user out
    sessionStorage.removeItem('userProfile');
    this.router.navigate(['/login']);
}
}
