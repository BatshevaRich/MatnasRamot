import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Family } from '../classes/Family';
import { baseURL} from '../../environments/environment';
import { Category } from '../Classes/Category';
@Injectable({
  providedIn: 'root'
})
export class FamilyService {
  // tslint:disable-next-line:member-ordering

  path = baseURL + 'Family';
  constructor(private http: HttpClient) {}

  getFamilies(): Observable<Family[]> {
    console.log(this.http.get<Family[]>(this.path));
    return this.http.get<Family[]>(this.path);
  }
  getFamily(id: number): Observable<Family> {
    return this.http.get<Family>(this.path + '/' + id);
  }
  addFamily(family: Family) {
    // const head = {params: new HttpParams().set ('newFamily','Family')};
    const s = family;
    const newFamily = new Family(52, 'dgfgg', null, null, null, null, null, null, null, null, null, null, null);

    this.http
      .post(this.path, newFamily)
      .subscribe(data => {
        console.log(data);
      });
  }
  updateFamily(family: Family) {
    // const head={params:new HttpParams() ('newFamily',Family)};
    this.http.put(this.path + '/' + family.Id, family);
  }
  removeFamily(id: number) {
    // const head={params:new HttpParams() ('newFamily',Family)};
    this.http.delete(this.path + '/' + id);
  }
  getCategoriesOfFamily(id: number): Observable<Category[]> {
    return this.http.get<Category[]>(this.path + id);
  }
}
