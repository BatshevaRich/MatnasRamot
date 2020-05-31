import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Volunteer } from '../Classes/Volunteer';
import { baseURL } from '../../environments/environment';
import { Category } from '../Classes/Category';
@Injectable({
  providedIn: 'root'
})
export class VolunteerService {
  path = baseURL + 'volunteer';
  constructor(private http: HttpClient) { }
  getVolunteers(): Observable<Volunteer[]> {
    return this.http.get<Volunteer[]>(this.path);
  }
  getVolunteer(id: number): Observable<Volunteer> {
    return this.http.get<Volunteer>(
      this.path + '/' + id
    );
  }
  addVolunteer(myvolunteer: Volunteer, categories: Category[]) {
    // returns id to be updated in table
    const myData = {} as any;
    myData.volunteer = myvolunteer;
    myData.categories = categories;
    return this.http
      .post(this.path, myData).toPromise().then(res => res);
  }
  updateVolunteer(myvolunteer: Volunteer) {
    // const head={params:new HttpParams() ('newVolunteer',myvolunteer)};
    this.http.put(
      this.path + '/' + myvolunteer.Id,
      myvolunteer
    ).subscribe(x => console.log(x));
  }
  removeVolunteer(id: number) {
    // const head={params:new HttpParams() ('newVolunteer',myvolunteer)};
    this.http.delete(this.path + '/' + id).subscribe(x => console.log(x));
  }
  getVolunteersByCategoryAndFamily(idFamily: number, category: Category): Observable<Volunteer[]> {
    return this.http.get<Volunteer[]>(this.path + '/familyandcategory/' + idFamily + '&category=' + category);
  }
  getCategoriesOfVolunteer(id: number) {
    return this.http.get<Category[]>(baseURL + 'CategoryVolunteer/' + id);
  }
  addCategoriesToVolunteer(id: number, categories: Category[]) {
    return this.http.get(baseURL + 'CategoryVolunteer/' + id + '&category=' + categories);
  }
  getVolunteersForFamily(fId: number): Observable<Volunteer[]> {
    return this.http.get<Volunteer[]>(baseURL + 'VolunteerAndFamily/Getvf/' + fId);
  }
}
