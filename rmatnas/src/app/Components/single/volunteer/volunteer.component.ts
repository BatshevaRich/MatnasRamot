import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Volunteer } from '../../../Classes/Volunteer';
import { Category } from '../../../Classes/Category';
import { VolunteerService } from '../../../services/volunteer.service';
import { VolunteerFComponent } from '../../forms/volunteer-f/volunteer-f.component';
import { MatDialog } from '@angular/material/dialog';
import { MatTabChangeEvent } from '@angular/material/tabs';
@Component({
  selector: 'app-volunteer',
  templateUrl: './volunteer.component.html',
  styleUrls: ['./volunteer.component.css']
})
export class VolunteerComponent implements OnInit, OnDestroy, AfterViewInit {
  chooseTab: string;
  myvolunteer: Volunteer;
  categories: Category[] = [];
  id: number;
  @Input() vId: number;
  @Input() toV: boolean;
  @Output() addedVolunteer: EventEmitter<Volunteer> = new EventEmitter<Volunteer>();
  // params for flex on page, if to show tables or not- do not show on
  // volunteer actions, show for example on all volunteers page
  smallest = '20%';
  small = '80%';
  large = '100%';
  largest = '0%';
  selectedTabIndex: number;
  showFamily = true;
  showEvent = false;
  showVolunteerings: boolean;
  constructor(public vs: VolunteerService,
              public dialog: MatDialog,
              private elementRef: ElementRef) {
    this.myvolunteer = new Volunteer('..', '..', '..', '..', '..', '1999', false);
  }

  ngOnDestroy(): void {
    this.elementRef.nativeElement.remove();
  }

  ngOnInit() { }

  ngAfterViewInit() {
    this.vs.getVolunteer(this.vId).subscribe((v: Volunteer) => {
      // get data of specific volunteer
      this.myvolunteer = this.vs.trimResultFromUpdate(v);
      // trim white lines at the end of results from db
      this.vs.getCategoriesOfVolunteer(this.vId).subscribe((c: Category[]) => {
        this.categories = c;
      });
    });
  }

  VolunteeropenDialog() {
    // open dialog for update volunteer
    const dialogRef = this.dialog.open(VolunteerFComponent, {
      data: {
        dataKey: this.myvolunteer,
        update: true,
        id: this.myvolunteer.Id,
        chosenC: this.categories
      }
    });
    dialogRef.afterClosed().subscribe(res => {
      // emit to all volunteers table
      this.addedVolunteer.emit(res);
    });
  }

  onTabChange(event: MatTabChangeEvent) {
    // only display data on selected tab- so app does not get too heavy
    setTimeout(() => {
      this.selectedTabIndex = event.index;
      if (event.index === 3) {
        this.showEvent = true;
      }
      if (event.index === 1) {
        this.showFamily = true;
      }
      if (event.index === 2) {
        this.showVolunteerings = true;
      }
    });
  }
}
