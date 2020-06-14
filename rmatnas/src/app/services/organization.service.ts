import { Injectable } from '@angular/core';
import { Organization } from '../Classes/Organization';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../Classes/Category';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {
  path = environment.baseURL + 'group';
  constructor(private http: HttpClient) { }
  getOrganizations(): Observable<Organization[]> {
    return this.http.get<Organization[]>(this.path);
  }
  getOrganization(id: number): Observable<Organization> {
    return this.http.get<Organization>(
      this.path + '/' + id
    );
  }
  addOrganization(myOrganization: Organization, categories: Category[]) {
    // returns id to be updated in table
    const myData = {} as any;
    myData.Organization = myOrganization;
    myData.categories = categories;
    return this.http
      .post(this.path, myData).toPromise().then(res => res);
  }
  updateOrganization(myOrganization: Organization, categoriesSelected: Category[]) {
    // const head={params:new HttpParams() ('newOrganization',myOrganization)};
    const myData = {} as any;
    myData.Organization = myOrganization;
    myData.categories = categoriesSelected;
    this.http.put(
      this.path, myData
    ).subscribe();
  }
  removeOrganization(id: number) {
    // const head={params:new HttpParams() ('newOrganization',myOrganization)};
    this.http.delete(this.path + '/' + id).subscribe();
  }
}
