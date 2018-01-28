import { Component, Input } from '@angular/core';
import { BoardService } from '../../services/board.service';
import { Board } from '../../models/board.model';
import { ScrumUser } from '../../models/scrumUser.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap/modal/modal-ref';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent {

  public scrumUser: ScrumUser;
  public sboard: Board;

@Input()board;

  constructor(private boardService: BoardService,
              public activeModal: NgbActiveModal,
              private modalService: NgbModal) { }

   add(): void {
    const modalRef = this.modalService.open(BoardComponent);

    console.log(this.scrumUser);
    this.sboard = new Board(null, 'I Work!', null, null);

    this.boardService.addBoard(this.sboard)
    .subscribe(board => this.sboard = board);
  }

  save(board) {
    console.log(board);

    this.boardService.updateBoard(this.sboard)
  .subscribe(sboard => this.sboard = sboard);
  }

}
