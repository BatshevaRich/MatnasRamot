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
  getOrganizationsByCategoryAndFamily(idFamily: number, id: number): Observable<Organization[]> {
    return this.http.get<Organization[]>(this.path + '/Organizationsbyfac/' + id, {headers: {Authorization: idFamily.toString()}});
  }
  getOrganizationsByCategoryAndVolunteer(idFamily: number, idVolunteer: number, id: number): Observable<Organization[]> {
    return this.http.get<Organization[]>(this.path + '/Organizationsbyfac/' + id,
    {headers: {Authorization: idFamily.toString(), volunteer: idVolunteer.toString()}});
  }
  getCategoriesOfOrganization(id: number) {
    return this.http.get<Category[]>(environment.baseURL + 'CategoryOrganization/' + id);
  }
  addCategoriesToOrganization(id: number, categories: Category[]) {
    return this.http.get(environment.baseURL + 'CategoryOrganization/' + id + '&category=' + categories);
  }
  getOrganizationsForFamily(fId: number): Observable<Organization[]> {
    return this.http.get<Organization[]>(environment.baseURL + 'OrganizationAndFamily/Getof/' + fId);
  }
  getOrganizationsForVolunteer(vId: number): Observable<Organization[]> {
    return this.http.get<Organization[]>(environment.baseURL + 'OrganizationAndVolunteer/Getov/' + vId);
  }
  getOrganizationsByCategory(idCategory: number): Observable<Organization[]> {
    return this.http.get<Organization[]>(this.path + '/Organizationsbycategory/' + idCategory);
  }
}
