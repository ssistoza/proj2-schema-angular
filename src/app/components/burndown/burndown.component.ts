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
  data: any;
  options: any;

  constructor(public activeModal: NgbActiveModal) {
        this.data = {
            labels: ['1/21', '1/22', '1/23', '1/24', '1/25', '1/26'],
            datasets: [
                {
                    label: 'Chart',
                    data: [120, 111, null, 98, 48],
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
                text: 'Burndown for week ' + '1/21/2018' + ' - ' + '1/27/2018',
                fontSize: 16
            },
            legend: {
                position: 'bottom'
            },
        };
    }

  ngOnInit() {

    this.chart.data = this.data;
    this.chart.options = this.options;
    this.chart.data.datasets[0].data.push(this.remainingPoints);
    this.chart.data.labels.push('1/29');
    this.chart.refresh();
  }

}
