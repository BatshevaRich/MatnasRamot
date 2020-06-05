import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Family } from '../Classes/Family';
import { baseURL } from '../../environments/environment';
import { Category } from '../Classes/Category';

@Injectable({
  providedIn: 'root'
})
export class FamilyService {
  // tslint:disable-next-line:member-ordering

  path = baseURL + 'family';
  constructor(private http: HttpClient) { }

  getFamilies(): Observable<Family[]> {
    return this.http.get<Family[]>(this.path);
  }

  getFamiliesByVolunteer(id: number): Observable<Family[]> {
    return this.http.get<Family[]>(baseURL + 'VolunteerAndFamily/' + id);
  }

  getFamily(id: number): Observable<Family> {
    return this.http.get<Family>(this.path + '/' + id);
  }

  addFamily(family: Family, categories: Category[]) {
    const myData = {} as any;
    myData.family = family;
    myData.categories = categories;
    return this.http
      .post(this.path, myData)
      .toPromise().then(res => res);
  }
  updateFamily(family: Family, categoriesSelected: Category[]) {
    // const head={params:new HttpParams() ('newFamily',Family)};
    const myData = {} as any;
    myData.family = family;
    myData.categories = categoriesSelected;
    this.http.put(
      this.path, myData
    ).subscribe();
  }
  removeFamily(id: number) {
    // const head={params:new HttpParams() ('newFamily',Family)};
    this.http.delete(this.path + '/' + id).subscribe();
  }
  getCategoriesOfFamily(id: number): Observable<Category[]> {
    return this.http.get<Category[]>(this.path + '/categoriesOfFamily/' + id);
  }
  getFamiliesByCategoryAndVolunteer(idCategory: number, idVolunteer): Observable<Family[]> {
    return this.http.get<Family[]>(this.path + '/familiesbycategory/' + idCategory, {headers: {Authorization: idVolunteer.toString()}});
  }

  getFamiliesByCategory(idCategory: number): Observable<Family[]> {
    return this.http.get<Family[]>(this.path + '/familiesbycategory/' + idCategory);
  }
}
