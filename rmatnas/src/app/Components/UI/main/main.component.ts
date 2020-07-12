import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { Category } from '../../../Classes/Category';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label, SingleDataSet } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { VolunteerAndFamilyService } from '../../../services/volunteer-and-family.service';
import { EventService } from '../../../services/event.service';
import { VolunteerAndFamily } from '../../../Classes/VolunteerAndFamily';
import { Eventt } from '../../../Classes/Eventt';
import { VolunteerService } from '../../../services/volunteer.service';
import { FamilyService } from '../../../services/family.service';
import { OrganizationService } from '../../../services/organization.service';
import { Volunteer } from '../../../Classes/Volunteer';
import { Family } from '../../../Classes/Family';
import { Organization } from '../../../Classes/Organization';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  public polarAreaChartLabels: Label[] = ['מתנדבות', 'משפחות', 'ארגונים', 'ארועים'];
  public polarAreaChartData: number[] = [];
  public polarAreaLegend = true;

  public polarAreaChartType: ChartType = 'polarArea';
  public polarAreaChartColors = [
    {
      backgroundColor: ['rgb(103, 58, 183)', 'rgba(0,255,0,0.3)', 'rgba(255,215,64, 0.8)', '#343a40']
    },
  ];
  constructor(public cs: CategoryService,
              public vaf: VolunteerAndFamilyService,
              public es: EventService,
              public vs: VolunteerService,
              public fs: FamilyService,
              public os: OrganizationService) {
    vs.getVolunteers().subscribe((res: Volunteer[]) => {
      this.polarAreaChartData.push(res.length);
      fs.getFamilies().subscribe((res: Family[]) => {
        this.polarAreaChartData.push(res.length);
        os.getOrganizations().subscribe((res: Organization[]) => {
          this.polarAreaChartData.push(res.length);
          es.getEvents().subscribe((e: Eventt[]) => {
            this.polarAreaChartData.push(e.length);
            // group.concat(Object.values(e.map(v => v.StartDate.substr(0, 4))));
            // this.unique.concat([...new Set(group.map(item => item))]);
            // this.barChartLabels = this.unique;
            const groups = e.reduce((groups, el) => {
              const date = el.StartDate.substr(0, 4);
              if (!groups[date]) {
                groups[date] = [];
              }
              groups[date].push(date);
              return groups;
            }, {});
            const groupArrays = Object.keys(groups).map((date) => {
              return {
                date,
                elements: groups[date]
              };
            });
            groupArrays.forEach(element => {
              this.barChartLabels.indexOf(element.date) === -1 ? this.barChartLabels.push(element.date) : 1;
              this.barChartData[1].data.push(element.elements.length);
              this.barChartData[1].backgroundColor = 'rgb(103, 58, 183)';
            });
          });
        });
      });
    });
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
    vaf.getVolunteerings().subscribe((res: VolunteerAndFamily[]) => {
      const groups = res.reduce((groups, el) => {
        const date = el.DateAdded.substr(0, 4);
        if (!groups[date]) {
          groups[date] = [];
        }
        groups[date].push(date);
        return groups;
      }, {});
      const groupArrays = Object.keys(groups).map((date) => {
        return {
          date,
          elements: groups[date]
        };
      });
      groupArrays.forEach(element => {
        this.barChartLabels.indexOf(element.date) === -1 ? this.barChartLabels.push(element.date) : 1;
        this.barChartData[0].data.push(element.elements.length);
      });
    });

    this.barChartData[0].backgroundColor = 'rgba(0,255,0,0.3)';
    this.barChartData[1].backgroundColor = 'rgb(103, 58, 183)';
  }
  categories: Category[] = [];
  datesOfVolunteerings: string[] = [];
  public pieChartLabels: Label[] = [];
  public pieChartData: number[] = [];
  public pieChartLabelsF: Label[] = [];
  public pieChartDataF: number[] = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [pluginDataLabels];
  unique: string[] = [];
  datesOfEvents: string[] = [];
  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          // const label = ctx.chart.data.labels[ctx.dataIndex];
          // return label;
        },
      },
    }
  };

  public pieChartColors = [
    {
      backgroundColor: ['rgb(103, 58, 183)', 'rgba(0,255,0,0.3)', 'rgba(255,215,64, 0.8)'],
    },
  ];

  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      xAxes: [{}], yAxes: [{
        display: true,
        ticks: {
          min: 0,
          max: 20,
          stepSize: 2
        }
      }]
    },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end'
      }
    }
  };
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];
  public barChartData: ChartDataSets[] = [
    { data: [], label: 'התנדבויות' },
    { data: [], label: 'ארועים' }
  ];

}
