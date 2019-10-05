import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Volunteer } from '../classes/Volunteer';

@Injectable({
  providedIn: 'root'
})
export class VolunteerService {
  path: string;
  // tslint:disable-next-line:member-ordering
  constructor(private http: HttpClient) { this.path = 'http://localhost:51229/api/volunteer'; }
  getVolunteers(): Observable<Volunteer[]> {
    return this.http.get<Volunteer[]>(this.path);
  }
  getVolunteer(id: number): Observable<Volunteer> {
    return this.http.get<Volunteer>(
      this.path + '/' + id
    );
  }
  addVolunteer(volunteer: Volunteer) {
    // const head = {params: new HttpParams().set ('newVolunteer','volunteer')};
    const s = volunteer.Age;
    volunteer = new Volunteer(52, 'dgfgg', null, null, null, null, s);
//deal with primary key issues!!
    this.http
      .post(this.path, volunteer)
      .subscribe(data => {
        console.log(data);
      });
  }
  updateVolunteer(volunteer: Volunteer) {
    // const head={params:new HttpParams() ('newVolunteer',volunteer)};
    this.http.put(
      this.path + '/' + volunteer.Id,
      volunteer
    );
  }
  removeVolunteer(id: number) {
    // const head={params:new HttpParams() ('newVolunteer',volunteer)};
    this.http.delete(this.path + '/' + id);
  }
}
