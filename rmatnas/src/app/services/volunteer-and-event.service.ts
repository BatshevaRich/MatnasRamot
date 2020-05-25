import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VolunteerAndEvent } from '../Classes/VolunteerAndEvent';
import { baseURL } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VolunteerAndEventService {

  constructor(private http: HttpClient) { }
  path = baseURL + 'VolunteerAndEvent/';
  getVolunteerings(): Observable<VolunteerAndEvent[]> {
    return this.http.get<VolunteerAndEvent[]>(this.path);
  }
  getVolunteering(id: number): Observable<VolunteerAndEvent> {
    return this.http.get<VolunteerAndEvent>(this.path + id);
  }
  addVolunteering(volunteering: VolunteerAndEvent) {

    this.http.post(this.path, volunteering).subscribe(data => {
      console.log(data);
    });
  }
  removeVolunteering(id: number) {
    this.http.delete(this.path + id).subscribe(data => {
      console.log(data);
    });
  }
}
