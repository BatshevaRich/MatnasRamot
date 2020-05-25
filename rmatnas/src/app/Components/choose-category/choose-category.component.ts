import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/Classes/Category';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-choose-category',
  templateUrl: './choose-category.component.html',
  styleUrls: ['./choose-category.component.css']
})
export class ChooseCategoryComponent implements OnInit, OnDestroy {
  categories: Category[] = [];
  mySubscription: Subscription;
  @Output() selectc: EventEmitter<Category[]> = new EventEmitter<Category[]>();
  categoriesSelected: Category[] = [];
  constructor(private cs: CategoryService) {
    this.mySubscription = cs.getCategories().subscribe(data => {
      this.categories = data;
      console.log(data);
    });
  }

  ngOnInit() {
  }
  ngOnDestroy() {
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
  }
  add(event, c: Category) {
    if (event.currentTarget.checked) {
      if (this.categoriesSelected.includes(c)) {
        this.categoriesSelected = this.categoriesSelected.filter(co => co.Id !== c.Id);
        this.selectc.emit(this.categoriesSelected);
      } else {
        this.categoriesSelected.push(c);
        this.selectc.emit(this.categoriesSelected);
      }
    } else {
      const index: number = this.categoriesSelected.indexOf(c);
      if (index !== -1) {
        this.categoriesSelected.splice(index, 1);
        this.selectc.emit(this.categoriesSelected);
      }
    }
  }
}
