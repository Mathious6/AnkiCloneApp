import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { HttpFacadeService } from "../http-facade.service";
import { AuthService } from "../auth.service";

@Component({
  selector: 'app-progress-statistics',
  templateUrl: './progress-statistics.component.html',
  styleUrls: ['./progress-statistics.component.css']
})
export class ProgressStatisticsComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {
    series: [{
      data: [],
      type: 'line'
    }]
  };
  todayFacts: number =0;
  globalProgress: number=0;
  nbCreatedPackages: number=0;
  constructor(private httpFacadeService: HttpFacadeService, private authService: AuthService) {}
  ngOnInit() {
    this.httpFacadeService.getUserStatistics(this.authService.session.userId).subscribe({
      next: value => {
        this.updateChartOptions(value[0].nextDays);
        this.todayFacts = value[1].todayFacts;
        this.globalProgress = value[2].globalProgress;
        this.nbCreatedPackages = value[3].nbCreatedPackages;
      },
    });
  }
  updateChartOptions(nextDaysData: Record<string, number>) {
    const dates = Object.keys(nextDaysData);
    const counts = Object.values(nextDaysData);
    this.chartOptions = {
      series: [{
        type: 'area',
        name: 'Facts',
        data: counts,
        color: 'black', // Change line color
        lineWidth: 2 // Adjust line width
      }],
      title: {
        text: 'Daily Progress'
      },
      xAxis: {
        title: {
          text: 'Next 17 Days'
        },
        categories: dates
      },
      yAxis: {
        title: {
          text: 'Facts to Review'
        }
      },
      plotOptions: {
        series: {
          dataLabels: {
            enabled: true
          }
        }
      },
      legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle'
      },
      accessibility: {
        enabled: false,
      }
    };
  }
}
