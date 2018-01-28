import { Component, Input, OnInit } from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-board-member',
  templateUrl: './board-member.component.html',
  styleUrls: ['./board-member.component.css']
})
export class BoardMemberComponent implements OnInit {

  @Input() boardId;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

}
