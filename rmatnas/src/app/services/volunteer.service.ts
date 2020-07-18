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
    return this.http.put(
      this.path, myData
    );
  }
  removeVolunteer(id: number) {
    // const head={params:new HttpParams() ('newVolunteer',myvolunteer)};
    return this.http.delete(this.path + '/' + id);
  }
  getVolunteersByCategoryAndFamily(idFamily: number, id: number): Observable<Volunteer[]> {
    return this.http.get<Volunteer[]>(this.path + '/volunteersbyfac/' + id, { headers: { Authorization: idFamily.toString() } });
  }
  getCategoriesOfVolunteer(id: number) {
    return this.http.get<Category[]>(environment.baseURL + 'CategoryVolunteer/' + id);
  }
  addCategoriesToVolunteer(id: number, categories: Category[]) {
    return this.http.get(environment.baseURL + 'CategoryVolunteer/' + id + '&category=' + categories);
  }
  getVolunteersForFamily(fId: number): Observable<Volunteer[]> {
    return this.http.get<Volunteer[]>(this.path + '/family/' + fId);
  }
  getVolunteersByCategory(idCategory: number): Observable<Volunteer[]> {
    return this.http.get<Volunteer[]>(this.path + '/volunteersbycategory/' + idCategory);
  }
  getVolunteersForEvent(idEvent: number): Observable<Volunteer[]> {
    return this.http.get<Volunteer[]>(environment.baseURL + 'event/volunteers/' + idEvent);
  }

  public trimResultsFromDB(volunteers: Volunteer[]) {
    for (const volunteer of volunteers) {
      volunteer.Name = volunteer.Name.trim();
      volunteer.Address == null ? volunteer.Address = '' : volunteer.Address = volunteer.Address.trim();
      volunteer.Telephone == null ? volunteer.Telephone = '' : volunteer.Telephone = volunteer.Telephone.trim();
      volunteer.Pelephone == null ? volunteer.Pelephone = '' : volunteer.Pelephone = volunteer.Pelephone.trim();
      volunteer.Email == null ? volunteer.Email = '' : volunteer.Email = volunteer.Email.trim();
      volunteer.Comments == null ? volunteer.Comments = '' : volunteer.Comments = volunteer.Comments.trim();
    }
    return volunteers;
  }

  public trimResultFromUpdate(volunteer: Volunteer) {
    volunteer.Name = volunteer.Name.trim();
    volunteer.Address == null ? volunteer.Address = '' : volunteer.Address = volunteer.Address.trim();
    volunteer.Telephone == null ? volunteer.Telephone = '' : volunteer.Telephone = volunteer.Telephone.trim();
    volunteer.Pelephone == null ? volunteer.Pelephone = '' : volunteer.Pelephone = volunteer.Pelephone.trim();
    volunteer.Email == null ? volunteer.Email = '' : volunteer.Email = volunteer.Email.trim();
    volunteer.Comments == null ? volunteer.Comments = '' : volunteer.Comments = volunteer.Comments.trim();
    return volunteer;
  }
}
