import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../Classes/Category';
import { Family } from '../Classes/Family';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  path = environment.baseURL + 'category';
  constructor(private http: HttpClient) { }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.path + '');
  }
  addCategory(category: Category) {

    this.http.post(this.path + '/', category).subscribe(data => {
    });
  }
  updateCategory(category: Category) {
    this.http.put(this.path + '/' + category.Id, category).subscribe(data => {
    });
  }
  removeCategory(id: number) {
    this.http.delete(this.path + '/' + id).subscribe(data => {
    });
  }
  AddCategoriesForFamily(f: Family, categories: Category[]) {
    this.http.post(environment.baseURL + 'CategoriesToFamily', categories).subscribe((data => {
    }));
  }
}
