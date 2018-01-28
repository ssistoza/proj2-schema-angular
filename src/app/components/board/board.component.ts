import { Component, Input } from '@angular/core';
import { BoardService } from '../../services/board.service';
import { Board } from '../../models/board.model';
import { ScrumUser } from '../../models/scrumUser.model';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { SessionService } from '../../services/session.service';
import { RolesService } from '../../services/roles.service';
import { Role } from '../../models/role.model';
import { BoardMember } from '../../models/boardMember.model';
import { BoardMemberService } from '../../services/board-member.service';


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent {


  public sboard: Board = new Board(null, null, null, null);

  @Input()board;
  @Input()scrumUserBoardList;


  constructor(private boardService: BoardService,
    public activeModal: NgbActiveModal,
    private modalService: NgbModal,
    private sessionService: SessionService,
    private rolesService: RolesService,
    private boardMemberService: BoardMemberService) { }


    addNewBoard() {

      this.boardService.addBoard(this.sboard)
      .subscribe(
        board => this.sboard = board,
        (error) => console.log('Error creating board'),
        () => this.getAdminRole(this.sboard)
      );
    }

    getAdminRole(b: Board)  {
      let role = new Role(null, null);

      this.rolesService.getAdmin()
      .subscribe(
        adminRole => role = adminRole,
        (error) => console.log('Error creating board owner'),
       () => this.createOwnerOfBoard(b, role)
          );
    }

    createOwnerOfBoard(b: Board, r: Role) {
      let userId = this.sessionService.getScrumUserId();
      let boardMember = new BoardMember(b, userId, r);
      this.boardMemberService.createBoardMember(boardMember)
      .subscribe( owner => boardMember = owner);
    }

    updateBoard() {
      this.boardService.updateBoard(this.board).subscribe(
        board2 => this.sboard = board2
      );
        }
}
