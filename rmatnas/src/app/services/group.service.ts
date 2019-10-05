import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Organization } from '../classes/Organization';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  // tslint:disable-next-line:member-ordering

  path: string;
  constructor(private http: HttpClient) { this.path = 'http://localhost:51229/api/Group'; }

  getOrganizations(): Observable<Organization[]> {
    return this.http.get<Organization[]>( this.path);
  }
  getOrganization(id: number): Observable<Organization> {
    return this.http.get<Organization>(this.path + '/' + id);
  }
  addOrganization(organization: Organization) {
    // const head = {params: new HttpParams().set ('newOrganization','Organization')};
    const s = Organization;
    const newOrganization = new Organization(52, 'dgfgg', null, null, null, null, null);

    this.http
      .post(this.path, newOrganization)
      .subscribe(data => {
        console.log(data);
      });
  }
  updateOrganization(organization: Organization) {
    // const head={params:new HttpParams() ('newOrganization',Organization)};
    this.http.put(this.path + '/' + organization.id, organization);
  }
  removeOrganization(id: number) {
    // const head={params:new HttpParams() ('newOrganization',Organization)};
    this.http.delete(this.path + '/' + id);
  }
}