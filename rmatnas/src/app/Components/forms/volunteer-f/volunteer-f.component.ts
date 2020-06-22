import { Component, OnInit, EventEmitter, Output, ViewChild, Inject, OnDestroy, ElementRef } from '@angular/core';
import { Volunteer } from '../../../Classes/Volunteer';
import { VolunteerService } from 'src/app/services/volunteer.service';
import { NgForm, FormControl, Validators } from '@angular/forms';
import { Category } from 'src/app/Classes/Category';
import { CategoryService } from 'src/app/services/category.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material';
@Component({
  selector: 'app-volunteer-f',
  templateUrl: './volunteer-f.component.html',
  styleUrls: ['./volunteer-f.component.css']
})
export class VolunteerFComponent implements OnInit, OnDestroy {
  categories: Category[] = [];
  categoriesOfVolunteer: Category[] = [];
  @ViewChild('volunteerForm') mytemplateForm: NgForm;
  email = new FormControl('', [Validators.required, Validators.email]);
  token = 0;
  categoriesSelected: Category[] = [];
  newVolunteer: Volunteer = new Volunteer('...', '...', '...', '...@example.com', '...', '1999-01-01', true);
  constructor(public vs: VolunteerService,
              private cs: CategoryService,
              private dialogRef: MatDialogRef<VolunteerFComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public snackBar: MatSnackBar,
              private elementRef: ElementRef) {
    cs.getCategories().subscribe((res: Category[]) => {
      this.categories = res;
    });
  }

  ngOnInit() {
    if (this.data.update) {
      this.newVolunteer = this.vs.trimResultFromUpdate(this.data.dataKey);
      this.categoriesOfVolunteer = this.data.chosenC;
    }
  }

  submitForm() {
    if (this.data.update) {
      this.newVolunteer.Id = this.data.id;
      this.vs.updateVolunteer(this.newVolunteer, this.categoriesSelected);
      this.dialogRef.close(this.newVolunteer);
    } else {
      this.vs.addVolunteer(this.newVolunteer, this.categoriesSelected)
        .then((t: number) => {
          this.token = t;
          this.newVolunteer.Id = this.token;
          this.categoriesSelected = [];
          this.dialogRef.close(this.token);
        });
      this.mytemplateForm.resetForm();
      this.newVolunteer = new Volunteer('default', '000000000', '000000000', 'default@ddd', 'default', '1999-01-01', false);
      this.snackBar.open('שמירת מתנדבת מבוצעת...', 'OK', {
        duration: 2000,
        direction: 'rtl'
      });
    }
  }

  ngOnDestroy(): void {
    this.elementRef.nativeElement.remove();
  }

  selectCategories(e: { checked: boolean, id: number, name: string }[]) {
    this.categoriesSelected = [];
    e.forEach((element: { checked: boolean, id: number, name: string }) => {
      if (element.checked) {
        this.categoriesSelected.push(new Category(element.name, element.id));
      }
    });
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'הערך שהוזן אינו תקני';
    }
  }

}
