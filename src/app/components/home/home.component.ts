import { Component, OnInit } from '@angular/core';
import { ScrumUser } from '../../models/scrumUser.model';
import { ScrumUserAccountService } from '../../services/scrum-user-account.service';
import { Board } from '../../models/board.model';
import { BoardService } from '../../services/board.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap/modal/modal-ref';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {BoardComponent} from '../board/board.component';
import { NavbarService } from '../../services/navbar/navbar.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public scrumUser: ScrumUser;
  public sboard: Board;

  constructor(private accountService: ScrumUserAccountService,
              private boardService: BoardService,
              private modalService: NgbModal,
              private navService: NavbarService
  ) { }

  open(board) {
    console.log(board);
const modalRef = this.modalService.open(BoardComponent);
modalRef.componentInstance.board = board;
}
  openToAdd(): void {
    const modalRef = this.modalService.open(BoardComponent);
    console.log(this.scrumUser);
  }

  getUserInfo() {
    this.accountService.getScrumUserAccount(1).subscribe(
      service => this.scrumUser = service
    );

  }
  ngOnInit() {
    this.getUserInfo();
    this.navService.loggedIn();
  }

}
