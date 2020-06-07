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
    return this.http.get<Eventt>(this.path + id);
  }
  addEvent(event: Eventt) {

   this.http.post(this.path, event).subscribe(data => { });
  }
  updateEvent(event: Eventt) {
   this.http.put(this.path + event.Id, event).subscribe(data => {
   });
  }
  removeEvent(id: number) {
   this.http.delete(this.path + id).subscribe(data => {
   });
  }
  getCategoriesOfEvent(id: number): Observable<Category[]> {
    return this.http.get<Category[]>(environment.baseURL + 'categoriesOfEvent?id=' + id);
  }
}
