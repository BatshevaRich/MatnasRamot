import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VolunteerAndFamily } from '../Classes/VolunteerAndFamily';
import { environment } from '../../environments/environment';
import { Volunteer } from '../Classes/Volunteer';
import { Family } from '../Classes/Family';
import { Category } from '../Classes/Category';
@Injectable({
  providedIn: 'root'
})
export class VolunteerAndFamilyService {

  constructor(private http: HttpClient) { }
  path = environment.baseURL + 'VolunteerAndFamily/';
  public getVolunteerings(): Observable<VolunteerAndFamily[]> {
    return this.http.get<VolunteerAndFamily[]>(this.path);
  }
  public getVolunteering(id: number): Observable<VolunteerAndFamily> {
    return this.http.get<VolunteerAndFamily>(this.path + 'Getvaf/' + id);
  }
  public addVolunteering(volunteering: VolunteerAndFamily) {
    this.http.post(this.path, volunteering).subscribe(data => {
    });
  }
  public removeVolunteering(id: number) {
    this.http.delete(this.path + id).subscribe(data => {
    });
  }

  addVolunteerAction(myvolunteer: Volunteer, myfamily: Family, category: Category) {
    const vaf: VolunteerAndFamily  = new VolunteerAndFamily(myfamily, myvolunteer, category, '', new Date().toISOString());
    return this.http
      .post(this.path, vaf).toPromise().then(res => res);
  }

  getVolunteeringsForVolunteer(idVolunteer: number) {
    return this.http.get<VolunteerAndFamily[]>(this.path + '/Getforvolunteer/' + idVolunteer);
  }

  getVolunteeringsForFamily(idFamily: number) {
    return this.http.get<VolunteerAndFamily[]>(this.path + '/Getforfamily/' + idFamily);
  }
}
