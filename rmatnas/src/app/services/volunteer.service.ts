import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Volunteer } from '../Classes/Volunteer';
import { environment } from '../../environments/environment';
import { Category } from '../Classes/Category';
@Injectable({
  providedIn: 'root'
})
export class VolunteerService {
  path = environment.baseURL + 'volunteer';
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
  updateVolunteer(myvolunteer: Volunteer, categoriesSelected: Category[]) {
    // const head={params:new HttpParams() ('newVolunteer',myvolunteer)};
    const myData = {} as any;
    myData.volunteer = myvolunteer;
    myData.categories = categoriesSelected;
    this.http.put(
      this.path, myData
    ).subscribe();
  }
  removeVolunteer(id: number) {
    // const head={params:new HttpParams() ('newVolunteer',myvolunteer)};
    this.http.delete(this.path + '/' + id).subscribe();
  }
  getVolunteersByCategoryAndFamily(idFamily: number, id: number): Observable<Volunteer[]> {
    return this.http.get<Volunteer[]>(this.path + '/volunteersbyfac/' + id, {headers: {Authorization: idFamily.toString()}});
  }
  getCategoriesOfVolunteer(id: number) {
    return this.http.get<Category[]>(environment.baseURL + 'CategoryVolunteer/' + id);
  }
  addCategoriesToVolunteer(id: number, categories: Category[]) {
    return this.http.get(environment.baseURL + 'CategoryVolunteer/' + id + '&category=' + categories);
  }
  getVolunteersForFamily(fId: number): Observable<Volunteer[]> {
    return this.http.get<Volunteer[]>(environment.baseURL + 'VolunteerAndFamily/Getvf/' + fId);
  }
  getVolunteersByCategory(idCategory: number): Observable<Volunteer[]> {
    return this.http.get<Volunteer[]>(this.path + '/volunteersbycategory/' + idCategory);
  }
  getVolunteersForEvent(idEvent: number): Observable<Volunteer[]> {
    return this.http.get<Volunteer[]>(environment.baseURL + 'event/volunteers/' + idEvent);
  }
}
