import { Component, OnInit, OnDestroy, Output, EventEmitter, Input, ElementRef, AfterViewInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/Classes/Category';
import { Observable } from 'rxjs';
import { ConfirmDialogModel, ConfirmDialogComponent } from '../../UI/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-choose-category',
  templateUrl: './choose-category.component.html',
  styleUrls: ['./choose-category.component.css']
})
export class ChooseCategoryComponent implements OnInit, OnDestroy, AfterViewInit {
  constructor(private cs: CategoryService,
              private elementRef: ElementRef,
              public dialog: MatDialog) {
    cs.getCategories().subscribe((data: Category[]) => {
      this.categories = data;
      this.categories.forEach((element: Category) => {
        if (this.chosenC) {
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
  displayForm = false;
  categories: Category[] = [];
  @Output() selectc: EventEmitter<{ checked: boolean, id: number, name: string }[]>
    = new EventEmitter<{ checked: boolean, id: number, name: string }[]>();
  @Input() chosenC: Category[] = [];
  categoriesSelected: Category[] = [];
  arr: Array<{ checked: boolean, id: number, name: string }> = [];
  idOfCategory: number;

  ngOnInit() { }

  ngAfterViewInit() { }

  ngOnDestroy(): void {
    this.elementRef.nativeElement.remove();
  }
  add() {
    this.selectc.emit(this.arr);
  }
  displayCat(id: number) {
    this.idOfCategory = id;
    this.displayForm = true;
  }
  deleteCat(id: number) {
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
