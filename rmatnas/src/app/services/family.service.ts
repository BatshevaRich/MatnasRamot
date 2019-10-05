import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Family } from '../classes/Family';

@Injectable({
  providedIn: 'root'
})
export class FamilyService {
  // tslint:disable-next-line:member-ordering

  path = 'http://localhost:51229/api/Family';
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
    this.http.put(this.path + '/' + family.id, family);
  }
  removeFamily(id: number) {
    // const head={params:new HttpParams() ('newFamily',Family)};
    this.http.delete(this.path + '/' + id);
  }
}
