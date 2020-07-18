import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { Eventt } from '../Classes/Eventt';
import { Category } from '../Classes/Category';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class EventService {
  path = environment.baseURL + 'event';
  constructor(private http: HttpClient) { }

  getEvents(): Observable<Eventt[]> {
    return this.http.get<Eventt[]>(this.path);
  }
  getEvent(id: number): Observable<Eventt> {
    return this.http.get<Eventt>(this.path + '/' + id);
  }
  addEvent(event: Eventt, categoriesSelect: Category[]) {
    const myData = {} as any;
    myData.event = event;
    myData.categories = categoriesSelect;
    return this.http.post(this.path, myData);
  }
  updateEvent(event: Eventt, categoriesSelect: Category[]) {
    const myData = {} as any;
    myData.event = event;
    myData.categories = categoriesSelect;
    return this.http.put(
      this.path, myData
    );
  }
  removeEvent(id: number) {
    return this.http.delete(this.path + '/' + id);
  }
  getEventsByCategoryAndFamily(idFamily: number, id: number): Observable<Eventt[]> {
    return this.http.get<Eventt[]>(this.path + '/Eventsbyfac/' + id, { headers: { Authorization: idFamily.toString() } });
  }
  getEventsByCategoryAndVolunteer(idVolunteer: number, id: number): Observable<Eventt[]> {
    return this.http.get<Eventt[]>(this.path + '/Eventsbyvac/' + id, { headers: { Authorization: idVolunteer.toString() } });
  }
  getCategoriesOfEvent(id: number) {
    return this.http.get<Category[]>(this.path + '/categoriesOfEvent/' + id);
  }
  addCategoriesToEvent(id: number, categories: Category[]) {
    return this.http.get(environment.baseURL + 'CategoryEvent/' + id + '&category=' + categories);
  }
  getEventsForFamily(fId: number): Observable<Eventt[]> {
    return this.http.get<Eventt[]>(environment.baseURL + 'EventtAndFamily/Getfe/' + fId);
  }
  getEventsForVolunteer(vId: number): Observable<Eventt[]> {
    return this.http.get<Eventt[]>(this.path + '/volunteer/' + vId);
  }
  getEventsByCategory(idCategory: number): Observable<Eventt[]> {
    return this.http.get<Eventt[]>(this.path + '/Eventsbycategory/' + idCategory);
  }
  addVolunteerToEvent(idEvent: number, idVolunteer: number) {
    ////////////////////////////////////////////////////////////////
    return this.http.put(this.path, idEvent);
  }

  trimResultsFromDB(events: Eventt[]) {
    for (const eventt of events) {
      eventt.Name = eventt.Name.trim();
      eventt.StartDate == null ? eventt.StartDate = '' : eventt.StartDate = eventt.StartDate.trim();
      eventt.EndDate == null ? eventt.EndDate = '' : eventt.EndDate = eventt.EndDate.trim();
      eventt.DateAdded == null ? eventt.DateAdded = '' : eventt.DateAdded = eventt.DateAdded.trim();
      eventt.Description == null ? eventt.Description = '' : eventt.Description = eventt.Description.trim();
    }
    return events;
  }

  trimResultFromUpdate(eventt: Eventt) {
    eventt.Name = eventt.Name.trim();
    eventt.StartDate == null ? eventt.StartDate = '' : eventt.StartDate = eventt.StartDate.trim();
    eventt.EndDate == null ? eventt.EndDate = '' : eventt.EndDate = eventt.EndDate.trim();
    eventt.DateAdded == null ? eventt.DateAdded = '' : eventt.DateAdded = eventt.DateAdded.trim();
    eventt.Description == null ? eventt.Description = '' : eventt.Description = eventt.Description.trim();
    return eventt;
  }
}
