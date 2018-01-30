import { Component, Input, OnInit } from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Subject} from 'rxjs/Subject';
import {debounceTime} from 'rxjs/operator/debounceTime';
import { ScrumUserAccountService } from '../../services/scrum-user-account.service';
import { ScrumUser } from '../../models/scrumUser.model';
import { BoardMember } from '../../models/boardMember.model';
import { Role } from '../../models/role.model';
import { Board } from '../../models/board.model';

@Component({
  selector: 'app-board-member',
  templateUrl: './board-member.component.html',
  styleUrls: ['./board-member.component.css']
})
export class BoardMemberComponent implements OnInit {

  @Input() boardId;

  public role: String = 'Select user role';
  public memberUsername: string;
  public boardMembers: ScrumUser[] = [];

  private _alert = new Subject<string>();
  private _alertSuccess = new Subject<string>();

  staticAlertClosed = false;
  alertMessage: string;
  successMessage: string;

  constructor(public activeModal: NgbActiveModal, private accountService: ScrumUserAccountService) { }

  addMember(selectedRole) {
    if (this.memberUsername === undefined) {
      this.changeAlertMessage(`Type in a username`);
    } else if (this.memberUsername.trim() === '') {
      this.changeAlertMessage(`Type in a username`);
    } else if (selectedRole !== '2' && selectedRole !== '3') {
      this.changeAlertMessage(`Select user role`);
    } else {
      let user;
      this.accountService.checkExists(new ScrumUser(null, this.memberUsername, null, null, null, null, null))
        .subscribe(
          userService => user = userService,
          (error) => console.log('Error' + error),
          () => { if (user < 0 ) {this.changeAlertMessage(`User does not exist`); } else {this.getMemberInfo(user, selectedRole); }}
      );
    }
  }

  getMemberInfo(userid, role) {
    let scrumUser: ScrumUser;
    this.accountService.getScrumUserAccount(userid).subscribe(
      (service) => scrumUser = service,
      (error) => console.log('Error' + error),
      () => this.checkIfMember(scrumUser, role)
    );
  }

  checkIfMember(scrumUser: ScrumUser, role) {
    let submit: Boolean = true;
    for (let i = 0; i < scrumUser.associatedBoards.length; i++) {
      if (scrumUser.associatedBoards[i].sboard.bId === this.boardId) {
        this.changeAlertMessage(`User already a member`);
        submit = false;
        break;
      }
    }
    if (submit) {
      let addToBoard: Board;
      addToBoard = new Board(this.boardId, null , null, null, null);
      let userRole: Role;
      userRole = new Role(null, null);
      if (role === '2') {
        userRole.roleId = 2;
      } else {
        userRole.roleId = 3;
      }
      let boardMember = new BoardMember(addToBoard, scrumUser.uId, userRole);
      this.accountService.addBoardMember(boardMember).subscribe(
        (service) => boardMember = service,
        (error) => console.log('Error' + error),
        () => {this.changeSuccessMessage('User added'); this.getAllBoardMembers(); }
      );
      this.memberUsername = '';
      this.role = 'Select user role';
    }
  }

  getAllBoardMembers() {
    let checkMembers: ScrumUser[] = [];
    this.boardMembers = [];
    this.accountService.getScrumUsers().subscribe (
      (service) => checkMembers = service,
      (error) => console.log('Error' + error),
      () => this.checkIfMembers(checkMembers)
    );
  }

  checkIfMembers(checkMembers: ScrumUser[]) {
    for (let i = 0; i < checkMembers.length; i++) {
      for (let j = 0; j < checkMembers[i].associatedBoards.length; j++) {
        if (checkMembers[i].associatedBoards[j].sboard.bId === this.boardId) {
          this.boardMembers.push(checkMembers[i]);
        }
      }
    }
  }

  deleteMe(member: Role, board: Board, userId: number) {
    console.log(member.roleType + ' ' + board.bName + ' ' + userId);
    let deleteUser = new BoardMember(board, userId, member);
    this.accountService.deleteBoardMember(deleteUser).subscribe (
      (service) => deleteUser = service,
      (error) => console.log('Error' + error),
      () => { this.changeAlertMessage(`User removed from board`); this.getAllBoardMembers(); }
    );
  }

  ngOnInit() {
    this.getAllBoardMembers();

    setTimeout(() => this.staticAlertClosed = true, 2000);

    this._alert.subscribe((message) => this.alertMessage = message);
    debounceTime.call(this._alert, 5000).subscribe(() => this.alertMessage = null);

    this._alertSuccess.subscribe((message) => this.successMessage = message);
    debounceTime.call(this._alertSuccess, 5000).subscribe(() => this.successMessage = null);
  }

  public changeAlertMessage(message) {
    this._alert.next(message);
  }

  public changeSuccessMessage(message) {
    this._alertSuccess.next(message);
  }

}
