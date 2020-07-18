import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VolunteerAndEvent } from '../Classes/VolunteerAndEvent';
import { environment } from '../../environments/environment';
import { Eventt } from '../Classes/Eventt';
import { Family } from '../Classes/Family';
import { Category } from '../Classes/Category';
import { Volunteer } from '../Classes/Volunteer';

@Injectable({
  providedIn: 'root'
})
export class VolunteerAndEventService {

  constructor(private http: HttpClient) { }
  path = environment.baseURL + 'VolunteerAndEvent/';
  getVolunteerings(): Observable<VolunteerAndEvent[]> {
    return this.http.get<VolunteerAndEvent[]>(this.path);
  }
  getVolunteering(id: number): Observable<VolunteerAndEvent> {
    return this.http.get<VolunteerAndEvent>(this.path + id);
  }
  addVolunteering(volunteering: VolunteerAndEvent) {
    this.http.post(this.path, volunteering).subscribe(data => {
    });
  }
  addVolunteerAction(myEvent: Eventt, myVolunteer: Volunteer, category: Category) {
    const vae: VolunteerAndEvent  = new VolunteerAndEvent(myEvent, myVolunteer, category, '', new Date().toISOString());
    return this.http.post(this.path, vae);
  }
  removeVolunteering(id: number) {
    this.http.delete(this.path + id).subscribe(data => {
    });
  }
}
