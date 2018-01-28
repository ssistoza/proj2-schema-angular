<<<<<<< HEAD
import { Component, Input } from '@angular/core';
=======
import { Component, Input, OnInit } from '@angular/core';
>>>>>>> 50298359ceea5210b467cbdbbdf38f4378fa1739
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
<<<<<<< HEAD
export class SwimlaneComponent {
=======
export class SwimlaneComponent implements OnInit {
>>>>>>> 50298359ceea5210b467cbdbbdf38f4378fa1739

  @Input() swimlane;
  @Input() properties: number;

  public swimLaneName: string;
<<<<<<< HEAD
=======
  public oldName: string;
>>>>>>> 50298359ceea5210b467cbdbbdf38f4378fa1739

  constructor(public activeModal: NgbActiveModal, private accountService: ScrumUserAccountService, public router: Router) { }

  save() {
<<<<<<< HEAD
    console.log((this.properties[1] + 1) + ' ' + this.properties[0] + ' ' + this.swimLaneName);
=======
>>>>>>> 50298359ceea5210b467cbdbbdf38f4378fa1739
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

<<<<<<< HEAD
=======
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
>>>>>>> 50298359ceea5210b467cbdbbdf38f4378fa1739
}
