import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Volunteer } from '../../../Classes/Volunteer';
import { VolunteerService } from 'src/app/services/volunteer.service';
import { Category } from 'src/app/Classes/Category';
import { MatDialog } from '@angular/material/dialog';
import { VolunteerFComponent } from '../../forms/volunteer-f/volunteer-f.component';
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
  selectedTabIndex: number;
  showFamily = false;
  showEvent = false;
  showOrganization = false;
  constructor(public vs: VolunteerService,
              public dialog: MatDialog,
              private elementRef: ElementRef) {
    this.myvolunteer = new Volunteer('..', '..', '..', '..', '..', '1999', false);
  }

  ngOnDestroy(): void {
    this.elementRef.nativeElement.remove();
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.vs.getVolunteer(this.vId).subscribe(v => {
      this.myvolunteer = v;
      console.log('volunteer component');
      this.vs.getCategoriesOfVolunteer(this.vId).subscribe(c => {
        this.categories = c;
      });
    });
  }

  VolunteeropenDialog() {
    const dialogRef = this.dialog.open(VolunteerFComponent, {
      data: {
        dataKey: this.myvolunteer,
        update: true,
        id: this.myvolunteer.Id,
        chosenC: this.categories
      }
    });
    dialogRef.afterClosed().subscribe(res => {
      this.addedVolunteer.emit(res);
    });
  }

  onTabChange(event) {
    setTimeout(() => {
      this.selectedTabIndex = event;
      if (event.index === 3) {
        this.showEvent = true;
      }
      if (event.index === 1) {
        this.showFamily = true;
      }
      if (event.index === 2) {
        this.showOrganization = true;
      }
    });
  }
}
