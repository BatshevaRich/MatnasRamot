import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { Category } from '../../../Classes/Category';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
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
  public polarAreaChartLabels: Label[] = ['מתנדבות', 'משפחות', 'ארגונים', 'ארועים', 'קטגוריות'];
  public polarAreaChartData: number[] = [];
  public polarAreaLegend = true;
  public polarAreaChartType: ChartType = 'polarArea';
  public polarAreaChartColors = [{ backgroundColor: ['rgb(103, 58, 183)', 'rgba(0,255,0,0.3)', 'rgba(255,215,64, 0.8)', '#343a40'] },];
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];
  public barChartData: ChartDataSets[] = [{ data: [], label: 'התנדבויות' }, { data: [], label: 'ארועים' }];
  categories: Category[] = [];
  datesOfVolunteerings: string[] = [];
  public pieChartLabels: Label[] = [];
  public pieChartData: number[] = [];
  public pieChartLabelsF: Label[] = [];
  public pieChartDataF: number[] = [];
  public pieChartLabelsA: Label[] = ['פעילה', 'לא פעילה'];
  public pieChartDataA: number[] = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [pluginDataLabels];
  unique: string[] = [];
  datesOfEvents: string[] = [];
  public pieChartOptions: ChartOptions = { responsive: true, legend: { position: 'top', } };
  public pieChartColors = [{ backgroundColor: ['rgb(103, 58, 183)', 'rgba(0,255,0,0.3)', 'rgba(255,215,64, 0.8)'], },];
  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{ display: true, ticks: { min: 0, max: 20, stepSize: 2 } }] },
    plugins: { datalabels: { anchor: 'end', align: 'end' } }
  };
  constructor(public cs: CategoryService,
              public vaf: VolunteerAndFamilyService,
              public es: EventService,
              public vs: VolunteerService,
              public fs: FamilyService,
              public os: OrganizationService) {
    // load all object in this order for polar bar order
    vs.getVolunteers().subscribe((res: Volunteer[]) => {
      this.polarAreaChartData.push(res.length);
      res = res.filter((v: Volunteer) => v.IsActive);
      const resA = this.polarAreaChartData[0] - res.length;
      this.pieChartDataA.push(res.length);
      this.pieChartDataA.push(resA);
      fs.getFamilies().subscribe((re: Family[]) => {
        this.polarAreaChartData.push(re.length);
        os.getOrganizations().subscribe((r: Organization[]) => {
          this.polarAreaChartData.push(r.length);
          es.getEvents().subscribe((e: Eventt[]) => {
            this.polarAreaChartData.push(e.length);
            // map events by year
            const groups = e.reduce((gs, el) => {
              const date = el.StartDate.substr(0, 4);
              if (!gs[date]) {
                gs[date] = [];
              }
              gs[date].push(date);
              return gs;
            }, {});
            // group event count by year
            const groupArrays = Object.keys(groups).map((date) => {
              return {
                date,
                elements: groups[date]
              };
            });
            groupArrays.forEach(element => {
              this.barChartLabels.indexOf(element.date) === -1 ? this.barChartLabels.push(element.date) : this.barChartLegend = true;
              this.barChartData[1].data.push(element.elements.length);
              this.barChartData[1].backgroundColor = 'rgb(103, 58, 183)';
            });
            cs.getCategories().subscribe(c => {
              this.categories = c;
              this.polarAreaChartData.push(c.length);
            });
          });
        });
      });
    });
    cs.GetAllCategoriesOfAllVolunteers().subscribe(data => {
      // map all categories of all volunteers to list with name of category and volunteers count
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
      // map all categories of all families to list with name of category and families count
      const all = [...data.reduce((mp, o) => {
        if (!mp.has(o.Name)) { mp.set(o.Name, { ...o, count: 0 }); }
        mp.get(o.Name).count++;
        return mp;
      }, new Map()).values()];
      all.forEach((element: { Name: Label; count: number; }) => {
        this.pieChartLabelsF.push(element.Name);
        this.pieChartDataF.push(element.count);
      });
    });

    vaf.getVolunteerings().subscribe((res: VolunteerAndFamily[]) => {
      // map all volunteering actions to graph timeline
      const groups = res.reduce((gs, el) => {
        const date = el.DateAdded.substr(0, 4);
        if (!gs[date]) {
          gs[date] = [];
        }
        gs[date].push(date);
        return gs;
      }, {});
      const groupArrays = Object.keys(groups).map((date) => {
        return {
          date,
          elements: groups[date]
        };
      });
      groupArrays.forEach(element => {
        this.barChartLabels.indexOf(element.date) === -1 ? this.barChartLabels.push(element.date) : this.barChartLegend = true;
        this.barChartData[0].data.push(element.elements.length);
      });
    });
    this.barChartData[0].backgroundColor = 'rgba(0,255,0,0.3)';
    this.barChartData[1].backgroundColor = 'rgb(103, 58, 183)';
  }
}
