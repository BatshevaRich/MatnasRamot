import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import {Eventt} from '../Classes/Eventt' ;
import { Category } from '../Classes/Category';
import { environment} from '../../environments/environment';
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
   return this.http.post(this.path, event).toPromise();
  }
  updateEvent(event: Eventt, categoriesSelect: Category[]) {
   return this.http.put(this.path + event.Id, event);
  }
  removeEvent(id: number) {
   this.http.delete(this.path + id).subscribe(data => {
   });
  }
  getEventsByCategoryAndFamily(idFamily: number, id: number): Observable<Eventt[]> {
    return this.http.get<Eventt[]>(this.path + '/Eventsbyfac/' + id, {headers: {Authorization: idFamily.toString()}});
  }
  getEventsByCategoryAndVolunteer(idVolunteer: number, id: number): Observable<Eventt[]> {
    return this.http.get<Eventt[]>(this.path + '/Eventsbyvac/' + id, {headers: {Authorization: idVolunteer.toString()}});
  }
  getCategoriesOfEvent(id: number) {
    return this.http.get<Category[]>(environment.baseURL + 'CategoryEventt/' + id);
  }
  addCategoriesToEvent(id: number, categories: Category[]) {
    return this.http.get(environment.baseURL + 'CategoryEvent/' + id + '&category=' + categories);
  }
  getEventsForFamily(fId: number): Observable<Eventt[]> {
    return this.http.get<Eventt[]>(environment.baseURL + 'EventtAndFamily/Getfe/' + fId);
  }
  getEventsForVolunteer(vId: number): Observable<Eventt[]> {
    return this.http.get<Eventt[]>(environment.baseURL + 'EventAndVolunteer/Getve/' + vId);
  }
  getEventsByCategory(idCategory: number): Observable<Eventt[]> {
    return this.http.get<Eventt[]>(this.path + '/Eventsbycategory/' + idCategory);
  }
  addVolunteerToEvent(idEvent: number, idVolunteer: number) {
    ////////////////////////////////////////////////////////////////
    return this.http.put(this.path, idEvent);
  }
}
