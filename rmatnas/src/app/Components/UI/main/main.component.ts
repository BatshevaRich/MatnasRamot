import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/Classes/Category';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  categories: Category[] = [];
  constructor(public cs: CategoryService) {
    cs.getCategories().subscribe(res => {
      this.categories = res;
    })
   }

  ngOnInit(): void {
  }

}
