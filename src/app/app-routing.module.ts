import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { SwimlanesComponent } from './components/swimlanes/swimlanes.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent },
  {path: 'swimlane', component: SwimlanesComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
