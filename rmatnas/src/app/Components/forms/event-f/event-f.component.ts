import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Eventt } from 'src/app/Classes/Eventt';
import { EventService } from 'src/app/services/event.service';
import { NgForm, FormBuilder, FormGroup } from '@angular/forms';
import { Category } from 'src/app/Classes/Category';
import { CategoryService } from 'src/app/services/category.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { OrganizationFComponent } from '../organization-f/organization-f.component';
import { RangesFooter } from '../../UI/ranges-footer/ranges-footer.component';
@Component({
  selector: 'app-event-f',
  templateUrl: './event-f.component.html',
  styleUrls: ['./event-f.component.css']
})
export class EventFComponent implements OnInit {

  @ViewChild('eventForm') mytemplateForm: NgForm;
  categories: Category[] = [];
  categoriesOfOrganization: Category[] = [];
  newEvent: Eventt = new Eventt(null, null, null, null, null);
  token = 0;
  categoriesSelected: Category[] = [];
  date: [{begin: Date, end: Date}];
  inlineRange;
  form: FormGroup;
  rangesFooter = RangesFooter;
  constructor(public es: EventService,
              private cs: CategoryService,
              private dialogRef: MatDialogRef<OrganizationFComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public snackBar: MatSnackBar,
               fb: FormBuilder) {
                this.form = fb.group({
                  date: [{begin: new Date(2020, 7, 5), end: new Date(2020, 7, 25)}]
                });
                cs.getCategories().subscribe(res => {
                  this.categories = res;
                });
               }

  ngOnInit() {
    if (this.data.update) {
      this.newEvent = this.data.dataKey;
      this.categoriesOfOrganization = this.data.chosenC;
    }
  }

  selectCategories(e) {
    this.categoriesSelected = [];
    e.forEach(element => {
      if (element.checked) {
        this.categoriesSelected.push(new Category(element.name));
      }
    });
  }

  submitForm(f) {
    if (this.data.update) {
      this.newEvent.Id = this.data.id;
      this.es.updateEvent(this.newEvent, this.categoriesSelected);
      this.dialogRef.close(this.newEvent);
    } else {
      this.es.addEvent(this.newEvent, this.categoriesSelected)
        .then(t => {
          this.token = t as number;
          /////////////////////// need to find out about safe casting in ts
          this.newEvent.Id = this.token;
          this.categoriesSelected = [];
          // this.addedVolunteer.emit(this.newVolunteer);
          this.dialogRef.close(this.token);
        });
      this.mytemplateForm.resetForm();
      this.newEvent = new Eventt(null, null, null, null, null);
      this.snackBar.open('שמירת ארגון מבוצעת...', 'OK', {
        duration: 2000,
        direction: 'rtl'
      });
    }
  }

  inlineRangeChange($event) {
    this.inlineRange = $event;
  }

}
