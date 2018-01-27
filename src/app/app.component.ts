import { Component } from '@angular/core';
import { AuthGuard } from './services/auth.guard';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Scrumhub';
  public loggedIn: boolean = false;

  constructor(private guard: AuthGuard, private router: Router) { }

  ngOnInit() { 
    this.anyoneLoggedIn();
  }

  anyoneLoggedIn() {
    if ( this.guard.isLoggedIn() ) { this.loggedIn = true; }
    if ( this.router.url.includes("register") ) { console.log(this.router.url); }
    // else { this.router.navigate(['/home']); } 
  }
}
