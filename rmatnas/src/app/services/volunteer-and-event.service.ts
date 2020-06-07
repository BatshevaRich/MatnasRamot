import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VolunteerAndEvent } from '../Classes/VolunteerAndEvent';
import { environment } from 'src/environments/environment';

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
  removeVolunteering(id: number) {
    this.http.delete(this.path + id).subscribe(data => {
    });
  }
}
