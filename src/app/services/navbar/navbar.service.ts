import { Injectable } from '@angular/core';
import { AuthGuard } from '../auth.guard';

@Injectable()
export class NavbarService {

  visible: boolean;

  constructor(private guard: AuthGuard) { }
  ngOnInit() { this.hide(); }

  hide() { this.visible = false; }
  show() { this.visible = true; }

  loggedIn() {
    if ( this.guard.isLoggedIn() ) { this.show(); }
    else { this.hide(); }
  }
}
