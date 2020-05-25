import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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
    console.log(this.http.get<Family[]>(this.path));
    return this.http.get<Family[]>(this.path);
  }

  getFamiliesByVolunteer(id: number): Observable<Family[]> {
    console.log(this.http.get<Family[]>(this.path)); // also bring categories
    return this.http.get<Family[]>(baseURL + 'VolunteerAndFamily/' + id);
  }

  getFamily(id: number): Observable<Family> {
    return this.http.get<Family>(this.path + '/' + id);
  }

  addFamily(family: Family, categories: Category[]) {
    const myData =  {} as any;
    myData.family = family;
    myData.categories = categories;
    return this.http
      .post(this.path, myData)
      .toPromise().then(res => res);
  }
  updateFamily(family: Family) {
    // const head={params:new HttpParams() ('newFamily',Family)};
    this.http.put(this.path + '/' + family.Id, family).subscribe(x => console.log(x));
  }
  removeFamily(id: number) {
    // const head={params:new HttpParams() ('newFamily',Family)};
    this.http.delete(this.path + '/' + id).subscribe(x => console.log(x));
  }
  getCategoriesOfFamily(id: number): Observable<Category[]> {
    return this.http.get<Category[]>(this.path + '/' + id);
  }
}
