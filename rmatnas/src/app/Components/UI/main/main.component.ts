import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/Classes/Category';
import { ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  categories: Category[] = [];
  constructor(public cs: CategoryService) {
    cs.getCategories().subscribe(res => {
      this.categories = res;
      cs.GetAllCategoriesOfAllVolunteers().subscribe(data => {
        const all = [...data.reduce((mp, o) => {
          if (!mp.has(o.Name)) { mp.set(o.Name, { ...o, count: 0 }); }
          mp.get(o.Name).count++;
          return mp;
        }, new Map()).values()];
        all.forEach((element: { Name: Label; count: number; }) => {
          this.pieChartLabels.push(element.Name);
          this.pieChartData.push(element.count);
        });
      });
      cs.GetAllCategoriesOfAllFamilies().subscribe(data => {
        const all = data.reduce((map => (r, a) =>
          (!map.has(a.Name) && map.set(a.Name, r[r.push({ name: a.Name, count: a.Id }) - 1]), map.get(a.Name), r))(new Map()),
          []
        );
        all.forEach((element: { name: Label; count: number; }) => {
          this.pieChartLabelsF.push(element.name);
          this.pieChartDataF.push(element.count);
        });
      });
    });
  }
  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    }
  };
  public pieChartLabels: Label[] = [];
  public pieChartData: number[] = [];
  public pieChartLabelsF: Label[] = [];
  public pieChartDataF: number[] = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [pluginDataLabels];
  public pieChartColors = [
    {
      backgroundColor: ['rgb(103, 58, 183)', 'rgba(0,255,0,0.3)', 'rgba(255,215,64, 0.8)'],
    },
  ];

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

}
