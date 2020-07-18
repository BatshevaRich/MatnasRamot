import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrganizationAndFamily } from '../Classes/OrganizationAndFamily';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrganizationAndFamilyService {

  path = environment.baseURL + 'OrganizationAndFamily/';
  constructor(private http: HttpClient) { }

  getVolunteerings(): Observable<OrganizationAndFamily[]> {
    return this.http.get<OrganizationAndFamily[]>(this.path);
  }
  getVolunteering(id: number): Observable<OrganizationAndFamily> {
    return this.http.get<OrganizationAndFamily>(this.path + id);
  }
  addFamilyToOrganization(value: OrganizationAndFamily) {
    return this.http.post(this.path, value);
  }
  removeVolunteering(id: number) {
    this.http.delete(this.path + id).subscribe(data => {
    });
  }
}
