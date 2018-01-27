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
import { BoardService } from './services/board.service';
import { BoardComponent } from './components/board/board.component';
import { LoginComponent } from './components/login/login.component';
import { LoginService } from './services/login/login.service';
import { AlertService } from './services/alert.service';
import { RegisterService } from './services/register/register.service';
import { AuthGuard } from './services/auth.guard';
import { AlertComponent } from './components/alert/alert.component';
import { RegisterComponent } from './components/register/register.component';
import { NavbarService } from './services/navbar/navbar.service';
import { SwimlaneComponent } from './components/swimlane/swimlane.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SwimlanesComponent,
    SwimlaneComponent,
    HomeComponent,
    StoryComponent,
    StoriesComponent,
    BoardComponent,
    LoginComponent,
    StoriesComponent,
    RegisterComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    NgbModule.forRoot()
  ],
  providers: [
    ScrumUserAccountService,
    LoginService,
    AlertService,
    RegisterService,
    NavbarService,
    AuthGuard,
    BoardService
  ],
  bootstrap: [AppComponent],
  entryComponents: [StoryComponent, BoardComponent],
  exports: []
})
export class AppModule { }
