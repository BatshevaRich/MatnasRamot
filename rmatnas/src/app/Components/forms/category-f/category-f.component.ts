import { Component, OnInit, Inject, ViewChild, Input, Output, EventEmitter, ElementRef, OnDestroy } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/Classes/Category';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-category-f',
  templateUrl: './category-f.component.html',
  styleUrls: ['./category-f.component.css']
})
export class CategoryFComponent implements OnInit, OnDestroy {
  @ViewChild('categoryForm') mytemplateForm: NgForm;
  newCategory: Category = new Category('...');
  token = 0;
  @Input() vId: number;
  @Output() changedCategory: EventEmitter<Category> = new EventEmitter<Category>();
  constructor(private cs: CategoryService,
              private dialogRef: MatDialogRef<CategoryFComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public snackBar: MatSnackBar,
              private elementRef: ElementRef) {

  }

  ngOnInit() {
    if (this.vId) {
      this.cs.getCategory(this.vId).subscribe(res => {
        this.newCategory = res;
      });
    }
  }
  submitForm(f) {
    if (this.vId) {
      this.newCategory.Id = this.vId;
      this.cs.updateCategory(this.newCategory).subscribe(res => {
        this.changedCategory.emit(this.newCategory);
      });
      // this.dialogRef.close(this.newCategory);
    } else {
      this.cs.addCategory(this.newCategory)
        .then(t => {
          this.token = t as number;
          /////////////////////// need to find out about safe casting in ts
          this.newCategory.Id = this.token;
          this.changedCategory.emit(this.newCategory);
          // this.dialogRef.close(this.token);

        });
      this.mytemplateForm.resetForm();
      this.newCategory = new Category('default');
      this.snackBar.open('שמירת קטגוריה מבוצעת...', 'OK', {
        duration: 2000,
        direction: 'rtl'
      });
    }
  }

  ngOnDestroy(): void {
    this.elementRef.nativeElement.remove();
  }

}
