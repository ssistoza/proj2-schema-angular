import { Component, OnInit, ViewChild, Input} from '@angular/core';
import { ChartModule, UIChart  } from 'primeng/primeng';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-burndown',
  templateUrl: './burndown.component.html',
  styleUrls: ['./burndown.component.css']
})
export class BurndownComponent implements OnInit {

  @ViewChild('chart') chart: UIChart;
  @Input() remainingPoints;
  @Input() burnTransactions;
  data: any;
  options: any;

  constructor(public activeModal: NgbActiveModal) {
        this.data = {
            labels: [],
            datasets: [
                {
                    label: 'Chart',
                    data: [],
                    fill: true,
                    borderColor: 'red',
                    backgroundColor: '#f97d16',
                    pointBackgroundColor: '#9c27b0',
                    // pointStyle: 'rect',
                    pointRadius: 5,
                    spanGaps: true
                    // steppedLine: true,
                }
            ]
        };
        this.options = {
            title: {
                display: true,
                text: 'Burndown',
                fontSize: 16
            },
            legend: {
                position: 'bottom'
            },
        };
    }

    populateBurndown() {

        let nextDate = new Date(this.burnTransactions[0].burnDate);
        let today = new Date(Date.now());
        let diference = today.getTime() - nextDate.getTime();
        let oneDay = (1000 * 60 * 60 * 24);

        let lblmax = Math.floor( diference / oneDay) + 2;

        let str = nextDate.toDateString();
        this.data.labels.push(str.substr(4, 7));
        this.data.datasets[0].data.push(this.burnTransactions[0].burnedPoint);
        
        if (lblmax < 7) {lblmax = 7; }

        let numElements = this.burnTransactions.length;
        for (let i = 1, j = 1 ; i < lblmax; i++) {
            nextDate = new Date(nextDate.getTime() + (1000 * 60 * 60 * 24));
            str = nextDate.toDateString();
            let d = new Date();
            if (j < numElements) {
                d = new Date(this.burnTransactions[j].burnDate);
            }
            if (str === d.toDateString() && j < numElements) {
                this.data.datasets[0].data.push(this.burnTransactions[j].burnedPoint);
                j++;
            } else {
                this.data.datasets[0].data.push(null);
            }
            this.data.labels.push(str.substr(4, 7));
        }
    }

  ngOnInit() {
    this.chart.data = this.data;
    this.chart.options = this.options;
    this.populateBurndown();
    // this.chart.data.datasets[0].data.push(this.remainingPoints);
    this.chart.data.labels.push('');
    this.chart.refresh();
  }

}
