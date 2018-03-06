import { Component, OnInit } from '@angular/core';
import { ScrumUser } from '../../models/scrumUser.model';
import { ScrumUserAccountService } from '../../services/scrum-user-account.service';
import { Board } from '../../models/board.model';
import { BoardService } from '../../services/board.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap/modal/modal-ref';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {BoardComponent} from '../board/board.component';
import { NavbarService } from '../../services/navbar/navbar.service';
import { SessionService } from '../../services/session.service';

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
              private navService: NavbarService,
              private sessionService: SessionService
  ) { }

  open(board, e: Event) {
    const modalRef = this.modalService.open(BoardComponent);
    e.stopPropagation();
    modalRef.componentInstance.board = board.sboard;
  }

  openToAdd() {
    const modalRef = this.modalService.open(BoardComponent);
    modalRef.result.then(() => setTimeout(() => { this.getUserInfo(); }, 300));
  }

  getUserInfo() {
    this.accountService.getScrumUserAccount(this.sessionService.getScrumUserId()).subscribe(
      service => this.scrumUser = service
    );
  }

  ngOnInit() {
    this.getUserInfo();
    this.navService.loggedIn();
  }

}
