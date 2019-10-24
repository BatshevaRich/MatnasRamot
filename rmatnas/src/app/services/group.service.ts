import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Organization } from '../Classes/Organization';
import { baseURL } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  // tslint:disable-next-line:member-ordering

  path = baseURL + 'Group';
  constructor(private http: HttpClient) { }

  getOrganizations(): Observable<Organization[]> {
    return this.http.get<Organization[]>(this.path);
  }
  getOrganization(Id: number): Observable<Organization> {
    return this.http.get<Organization>(this.path + '/' + Id);
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
    this.http.put(this.path + '/' + organization.Id, organization).subscribe(x => console.log(x));
  }
  removeOrganization(Id: number) {
    // const head={params:new HttpParams() ('newOrganization',Organization)};
    this.http.delete(this.path + '/' + Id).subscribe(x => console.log(x));
  }
}