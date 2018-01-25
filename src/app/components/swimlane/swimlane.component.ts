import { Component, Input } from '@angular/core';
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
export class SwimlaneComponent {

  @Input() swimlane;
  @Input() properties: number;

  public swimLaneName: string;

  constructor(public activeModal: NgbActiveModal, private accountService: ScrumUserAccountService, public router: Router) { }

  save() {
    console.log((this.properties[1] + 1) + ' ' + this.properties[0] + ' ' + this.swimLaneName);
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

}
