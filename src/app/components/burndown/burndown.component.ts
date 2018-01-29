import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../services/alert.service';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-burndown',
  templateUrl: './burndown.component.html',
  styleUrls: ['./burndown.component.css']
})
export class BurndownComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() { }

  
}
