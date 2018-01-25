import { Component, OnInit } from '@angular/core';
import { ScrumUser } from '../../models/scrumUser.model';
import { ScrumUserAccountService } from '../../services/scrum-user-account.service';
import { Board } from '../../models/board.model';
import { BoardService } from '../../services/board.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap/modal/modal-ref';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {BoardComponent} from '../board/board.component';

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
              private modalService: NgbModal
              // public activeModal: NgbActiveModal) { } // added for editboard pop-up window
  ) {}
  add(): void {
    console.log(this.scrumUser);
    this.sboard = new Board(null, 'I Work!', null);

    this.boardService.addBoard(this.sboard)
      .subscribe(board => this.sboard = board);
  }

  update(board) {
const modalRef = this.modalService.open(BoardComponent);
modalRef.componentInstance.board = board;

   // console.log(this.scrumUser);
    // this.boardService.updateBoard(this.sboard)
    // .subscribe(board => this.sboard = board);
  }

  // open(story) {
  //   const modalRef = this.modalService.open(StoryComponent);
  //   modalRef.componentInstance.story = story;
  // }

  getUserInfo() {
    this.accountService.getScrumUserAccount(1).subscribe(
      service => this.scrumUser = service
    );

  }
  ngOnInit() {
    this.getUserInfo();
  }

}
