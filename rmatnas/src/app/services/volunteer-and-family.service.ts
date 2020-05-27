import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VolunteerAndFamily } from '../Classes/VolunteerAndFamily';
import { baseURL } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class VolunteerAndFamilyService {

  constructor(private http: HttpClient) { }
  path = baseURL + 'VolunteerAndFamily/';
  public getVolunteerings(): Observable<VolunteerAndFamily[]> {
    return this.http.get<VolunteerAndFamily[]>(this.path);
  }
  public getVolunteering(id: number): Observable<VolunteerAndFamily> {
    return this.http.get<VolunteerAndFamily>(this.path + id);
  }
  public addVolunteering(volunteering: VolunteerAndFamily) {
    this.http.post(this.path, volunteering).subscribe(data => {
      console.log(data);
    });
  }
  public removeVolunteering(id: number) {
    this.http.delete(this.path + id).subscribe(data => {
      console.log(data);
    });
  }
}
