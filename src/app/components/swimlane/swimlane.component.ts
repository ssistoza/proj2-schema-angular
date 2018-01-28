import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap/modal/modal-ref';
import { Swimlane } from '../../models/swimlane.model';
import { ScrumUserAccountService } from '../../services/scrum-user-account.service';
import { SlStatus } from '../../models/slStatus.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-swimlane',
  templateUrl: './swimlane.component.html',
  styleUrls: ['./swimlane.component.css']
})
export class SwimlaneComponent implements OnInit {

  @Input() swimlane;
  @Input() properties: number;

  public swimLaneName: string;
  public oldName: string;

  constructor(public activeModal: NgbActiveModal, private accountService: ScrumUserAccountService, public router: Router) { }

  save() {
    this.router.navigated = false;
    if (this.swimLaneName !== undefined && this.swimLaneName.trim() !== '') {
      this.swimlane = new Swimlane (null, this.swimLaneName, (this.properties[1] + 1), null , this.properties[0] , null);

      this.accountService.addSwimlane(this.swimlane)
        .subscribe(
          newSwimlane => this.swimlane = newSwimlane
      );
    } else {
      this.router.navigateByUrl(`/swimlane/${this.properties[0]}`);
    }
  }

  update() {
    this.router.navigated = false;
    if (this.swimlane.slName !== undefined && this.swimlane.slName.trim() !== '') {
      this.accountService.updateSwimlane(this.swimlane)
        .subscribe(
          updateSwimlane => this.swimlane = updateSwimlane
      );
    } else {
      this.router.navigateByUrl(`/swimlane/${this.properties[0]}`);
    }
  }

  ngOnInit() {
    this.oldName = (this.swimlane !== undefined) ? this.swimlane.slName : '';
  }
}
