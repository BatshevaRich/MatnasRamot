import { Component, OnInit, ViewChild, Inject, OnDestroy, ElementRef, AfterViewInit } from '@angular/core';
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
export class EventFComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('eventForm') mytemplateForm: NgForm;
  categories: Category[] = [];
  categoriesOfOrganization: Category[] = [];
  newEvent: Eventt = new Eventt(null, null, null, null, null);
  token = 0;
  categoriesSelected: Category[] = [];
  date: [{ begin: Date, end: Date }];
  inlineRange;
  form: FormGroup;
  rangesFooter = RangesFooter;
  constructor(public es: EventService,
              private cs: CategoryService,
              private dialogRef: MatDialogRef<OrganizationFComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public snackBar: MatSnackBar,
              fb: FormBuilder,
              private elementRef: ElementRef) {
    this.form = fb.group({
      date: [{ begin: new Date(2020, 7, 5), end: new Date(2020, 7, 25) }]
    });
    cs.getCategories().subscribe((res: Category[]) => {
      this.categories = res;
    });
  }

  ngAfterViewInit() {
    this.date = [{ begin: new Date(), end: new Date() }];
  }
  ngOnInit() {
    if (this.data.update) {
      this.newEvent = this.es.trimResultFromUpdate(this.data.dataKey);
      this.categoriesOfOrganization = this.data.chosenC;
    }
  }

  selectCategories(e: { checked: boolean, id: number, name: string }[]) {
    this.categoriesSelected = [];
    e.forEach((element: { checked: boolean, id: number, name: string }) => {
      if (element.checked) {
        this.categoriesSelected.push(new Category(element.name, element.id));
      }
    });
  }

  submitForm() {
    if (this.data.update) {
      this.newEvent.Id = this.data.id;
      this.newEvent.DateAdded = new Date().toDateString();
      this.newEvent.StartDate = this.date[0].begin.toDateString();
      this.newEvent.EndDate = this.date[0].end.toDateString();
      this.es.updateEvent(this.newEvent, this.categoriesSelected);
      this.dialogRef.close(this.newEvent);
    } else {
      this.newEvent.DateAdded = new Date().toDateString();
      this.newEvent.StartDate = this.date[0].begin.toDateString();
      this.newEvent.EndDate = this.date[0].end.toDateString();
      this.es.addEvent(this.newEvent, this.categoriesSelected)
        .then((t: number) => {
          this.token = t;
          this.newEvent.Id = this.token;
          this.categoriesSelected = [];
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
  ngOnDestroy(): void {
    this.elementRef.nativeElement.remove();
  }
}
