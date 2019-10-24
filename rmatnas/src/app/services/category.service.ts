import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../Classes/Category';
import { Family } from '../Classes/Family';
import { baseURL } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  path = baseURL + 'category';
  constructor(private http: HttpClient) { }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.path + '');
  }
  addCategory(category: Category) {

    this.http.post(this.path + '/', category).subscribe(data => {
      console.log(data);
    });
  }
  updateCategory(category: Category) {
    this.http.put(this.path + '/' + category.Id, category).subscribe(data => {
      console.log(data);
    });
  }
  removeCategory(id: number) {
    this.http.delete(this.path + '/' + id).subscribe(data => {
      console.log(data);
    });
  }
  AddCategoriesForFamily(f: Family, categories: Category[]) {
    this.http.post(baseURL + 'CategoriesToFamily', categories).subscribe((data => {
      console.log(data);
    }));
  }
}
//