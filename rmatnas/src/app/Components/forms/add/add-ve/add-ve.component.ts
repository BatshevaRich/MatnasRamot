import { Component, OnInit, Input, Inject, ElementRef, OnDestroy } from '@angular/core';
import { Volunteer } from '../../../../Classes/Volunteer';
import { Category } from '../../../../Classes/Category';
import { Eventt } from '../../../../Classes/Eventt';
import { VolunteerService } from '../../../../services/volunteer.service';
import { CategoryService } from '../../../../services/category.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddFOComponent } from '../add-fo/add-fo.component';
import { EventService } from '../../../../services/event.service';
import { VolunteerAndEventService } from '../../../../services/volunteer-and-event.service';

@Component({
  selector: 'app-add-ve',
  templateUrl: './add-ve.component.html',
  styleUrls: ['./add-ve.component.css']
})
export class AddVEComponent implements OnInit, OnDestroy {

  @Input() idEvent: number;
  @Input() idVolunteer: number;
  volunteers: Volunteer[] = [];
  objectCategories: Category[] = [];
  comments: string;
  selectedEvent: Eventt = null;
  selectedVolunteer: Volunteer = null;
  selectedCategory: Category;
  selectedCategories: Category[] = [];
  selectedVolunteers: Volunteer[] = [];
  constructor(private vs: VolunteerService,
              private es: EventService,
              private cs: CategoryService,
              private vae: VolunteerAndEventService,
              private dialogRef: MatDialogRef<AddVEComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private snackBar: MatSnackBar,
              private elementRef: ElementRef) {
       this.refresh();
  }

  refresh() {
    this.selectedCategory = null;
    this.selectedEvent = this.data.eventt;
    this.selectedVolunteer = this.data.volunteer;
    if (this.selectedEvent) {
      this.es.getCategoriesOfEvent(this.selectedEvent.Id).subscribe((res: Category[]) => {
        this.objectCategories = res;
      });
      this.vs.getVolunteers().subscribe((res: Volunteer[]) => {
        this.volunteers = res;
      });
    }
  }

  ngOnInit() { }

  ngOnDestroy(): void {
    this.elementRef.nativeElement.remove();
  }

  onSelection(event) {
  }

  onSelectionC(event: Category) {
    if (event) {
      this.selectedCategory = event;
      if (this.selectedEvent) {
        this.vs.getVolunteersByCategory(event.Id).subscribe((res: Volunteer[]) => {
          this.volunteers = res;
        });
      }
    } else {
      this.selectedCategory = null;
      this.vs.getVolunteers().subscribe((res: Volunteer[]) => {
          this.volunteers = res;
      });
    }
  }

    submitForm() {
    this.selectedVolunteers.forEach((element: Volunteer) => {
      this.vae.addVolunteerAction(this.selectedEvent, element, this.selectedCategory).subscribe(() => {
      }, err => {console.log(err.message); alert('לא ניתן להוסיף מתנדבת לארוע. נא לנסות מאוחר יותר'); });
      this.snackBar.open('שמירה מבוצעת...', 'OK', {
        duration: 2000,
            direction: 'rtl'
          });
    });
    this.dialogRef.close(this.selectedEvent.Id);

  }

}
