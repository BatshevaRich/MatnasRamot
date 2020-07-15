import { Component, OnInit, OnDestroy, Output, EventEmitter, Input, ElementRef, AfterViewInit } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { Category } from '../../../Classes/Category';
import { Observable } from 'rxjs';
import { ConfirmDialogModel, ConfirmDialogComponent } from '../../UI/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-choose-category',
  templateUrl: './choose-category.component.html',
  styleUrls: ['./choose-category.component.css']
})
export class ChooseCategoryComponent implements OnInit, OnDestroy, AfterViewInit {
  displayForm = false;
  categories: Category[] = [];
  @Output() selectc: EventEmitter<{ checked: boolean, id: number, name: string }[]>
    = new EventEmitter<{ checked: boolean, id: number, name: string }[]>();
  // chosen categories, input from form component
  @Input() chosenC: Category[] = [];
  categoriesSelected: Category[] = [];
  arr: Array<{ checked: boolean, id: number, name: string }> = [];
  idOfCategory: number;
  constructor(private cs: CategoryService,
              private elementRef: ElementRef,
              public dialog: MatDialog) {
    cs.getCategories().subscribe((data: Category[]) => {
      this.categories = data;
      this.categories.forEach((element: Category) => {
        if (this.chosenC) { // if categories from form, mark them as selected
          if (this.chosenC.find(x => x.Id === element.Id)) {
            this.arr.push({ checked: true, id: element.Id, name: element.Name });
          } else {
            this.arr.push({ checked: false, id: element.Id, name: element.Name });
          }
        } else {
          this.arr.push({ checked: false, id: element.Id, name: element.Name });
        }
      });
    });
  }

  ngOnInit() { }

  ngAfterViewInit() { }

  ngOnDestroy(): void {
    this.elementRef.nativeElement.remove();
  }

  add() {
    // emit to form that categories were selected
    this.selectc.emit(this.arr);
  }
  displayCat(id: number) {
    // edit category
    this.idOfCategory = id;
    this.displayForm = true;
  }
  deleteCat(id: number) {
    // delete category, removes from all places containing category!
    this.confirmDialog().subscribe(res => {
      if (res) {
        this.cs.removeCategory(id).subscribe(result => {
          this.categories = this.categories.filter(i => i.Id !== id);
          this.arr = this.arr.filter(i => i.id !== id);
        });
      }
    });
  }

  confirmDialog(): Observable<any> {
    const message = `מחיקה זו היא לצמיתות, כולל מחיקת כל המקומות בהן קטגוריה זו מופיעה. האם תרצי להמשיך?`;
    const dialogData = new ConfirmDialogModel('מחיקת קטגוריה', message);
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '75%',
      data: dialogData
    });
    return dialogRef.afterClosed();
  }

  public reloadWithNewData() {
    // reload all categories after edit of category
    this.cs.getCategories().subscribe((res: Category[]) => {
      this.arr = [];
      this.categories = res;
      if (this.chosenC) {
        this.categories.forEach((element: Category) => {
          if (this.chosenC.find(x => x.Id === element.Id)) {
            this.arr.push({ checked: true, id: element.Id, name: element.Name });
          } else {
            this.arr.push({ checked: false, id: element.Id, name: element.Name });
          }
          this.displayForm = false;
        });
      }
    });
  }

}
