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

@Component({
  selector: 'app-add-ve',
  templateUrl: './add-ve.component.html',
  styleUrls: ['./add-ve.component.css']
})
export class AddVEComponent implements OnInit, OnDestroy {

  @Input() idEvent: number;
  volunteers: Volunteer[] = [];
  selectedVolunteers: Volunteer[] = [];
  categories: Category[] = [];
  selectedEvent: Eventt = null;
  selectedCategories: Category[] = [];
  constructor(private vs: VolunteerService,
              private es: EventService,
              private cs: CategoryService,
              private dialogRef: MatDialogRef<AddFOComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private snackBar: MatSnackBar,
              private elementRef: ElementRef) {
  }

  ngOnInit() {
    this.idEvent = this.data.id;
    this.es.getEvent(this.idEvent).subscribe((res: Eventt) => {
      this.selectedEvent = res;
    });
    this.es.getCategoriesOfEvent(this.idEvent).subscribe((cats: Category[]) => {
      this.selectedCategories = cats;
      this.selectedCategories.forEach(element => {
        this.vs.getVolunteersByCategory(element.Id).subscribe((data: Volunteer[]) => {
          data.forEach(volunteer => {
            this.volunteers.push(volunteer);
          });
        });
      });
    });
   }

  ngOnDestroy(): void {
    this.elementRef.nativeElement.remove();
  }

  onSelection(event) {
  }


  submitForm() {
    this.selectedVolunteers.forEach((element: Volunteer) => {
      this.es.addVolunteerToEvent(this.selectedEvent.Id, element.Id);
    });

    // this.vaf.addEventtAction(this.selectedEventt, this.selectedVolunteer, this.selectedCategory);
    // this.snackBar.open('שמירת התנדבות מבוצעת...', 'OK', {
    //     duration: 2000,
    //     direction: 'rtl'
    //   });
  }

}
