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
  getCategory(id: number): Observable<Category> {
    return this.http.get<Category>(this.path + '/' + id);
  }
  addCategory(category: Category) {
    return this.http.post(this.path + '/', category).toPromise().then(res => res);
  }
  updateCategory(category: Category) {
    return this.http.put(this.path + '/' + category.Id, category);
  }
  removeCategory(id: number) {
    return this.http.delete(this.path + '/' + id);
  }
  AddCategoriesForFamily(f: Family, categories: Category[]) {
    this.http.post(environment.baseURL + 'CategoriesToFamily', categories).subscribe((data => {
    }));
  }

  GetAllCategoriesOfAllVolunteers() {
    return this.http.get<Category[]>(this.path + '/allcategoriesvolunteers');
  }

  GetAllCategoriesOfAllFamilies() {
    return this.http.get<Category[]>(this.path + '/allcategoriesfamilies');
  }
}
