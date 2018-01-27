import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SwimlanesComponent } from './components/swimlanes/swimlanes.component';
import { HomeComponent } from './components/home/home.component';
import { AppRoutingModule } from './/app-routing.module';
import { StoryComponent } from './components/story/story.component';
import { StoriesComponent } from './components/stories/stories.component';
import { FormsModule } from '@angular/forms';
import { ScrumUserAccountService } from './services/scrum-user-account.service';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { SwimlaneComponent } from './components/swimlane/swimlane.component';
import { TaskComponent } from './components/task/task.component';
import { TaskService } from './services/task.service';
//import { Ng2OrderModule } from 'ng2-order-pipe';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SwimlanesComponent,
    HomeComponent,
    StoryComponent,
    StoriesComponent,
    SwimlaneComponent,
    TaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    NgbModule.forRoot()
  ],
  providers: [ScrumUserAccountService,TaskService],
  bootstrap: [AppComponent],
  entryComponents: [StoryComponent, SwimlaneComponent], // used for bootstrap modal
  exports: []
})
export class AppModule { }
