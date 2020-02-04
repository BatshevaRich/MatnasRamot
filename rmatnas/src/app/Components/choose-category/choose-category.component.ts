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
    this.mySubscription.unsubscribe();
  }
  add(c: Category) {
    if (this.categoriesSelected.includes(c)) {
      this.categoriesSelected = this.categoriesSelected.filter(co => co.Id !== c.Id);
    } else {
      this.categoriesSelected.push(c);
    }
  }
  finishCheck() {
    this.selectc.emit(this.categoriesSelected);
  }
}
