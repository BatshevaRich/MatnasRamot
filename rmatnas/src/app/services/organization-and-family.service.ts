import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrganizationAndFamily } from '../Classes/OrganizationAndFamily';
import { baseURL } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrganizationAndFamilyService {

  path = baseURL + 'OrganizationAndFamily/';
  constructor(private http: HttpClient) { }

  getVolunteerings(): Observable<OrganizationAndFamily[]> {
    return this.http.get<OrganizationAndFamily[]>(this.path);
  }
  getVolunteering(id: number): Observable<OrganizationAndFamily> {
    return this.http.get<OrganizationAndFamily>(this.path + id);
  }
  addVolunteering(volunteering: OrganizationAndFamily) {

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