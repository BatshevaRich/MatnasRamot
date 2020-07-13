import { Injectable } from '@angular/core';
import { Organization } from '../Classes/Organization';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../Classes/Category';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {
  path = environment.baseURL + 'organization';
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
    myData.organization = myOrganization;
    myData.categories = categories;
    return this.http
      .post(this.path, myData).toPromise().then(res => res);
  }
  updateOrganization(myOrganization: Organization, categoriesSelected: Category[]) {
    // const head={params:new HttpParams() ('newOrganization',myOrganization)};
    const myData = {} as any;
    myData.organization = myOrganization;
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
  getCategoriesOfOrganization(id: number): Observable<Category[]> {
    return this.http.get<Category[]>(this.path + '/categories/' + id);
  }
  addCategoriesToOrganization(id: number, categories: Category[]) {
    return this.http.get(environment.baseURL + 'CategoryOrganization/' + id + '&category=' + categories);
  }
  getOrganizationsForFamily(fId: number): Observable<Organization[]> {
    return this.http.get<Organization[]>(environment.baseURL + 'family/organizations/' + fId);
  }
  getOrganizationsForVolunteer(vId: number): Observable<Organization[]> {
    return this.http.get<Organization[]>(environment.baseURL + 'OrganizationAndVolunteer/Getov/' + vId);
  }
  getOrganizationsByCategory(idCategory: number): Observable<Organization[]> {
    return this.http.get<Organization[]>(this.path + '/Organizationsbycategory/' + idCategory);
  }

  public trimResultsFromDB(organizations: Organization[]) {
    for (const organization of organizations) {
      organization.Name = organization.Name.trim();
      organization.email = organization.email.trim();
      organization.Address == null ? organization.Address = '' : organization.Address = organization.Address.trim();
      organization.Phone == null ? organization.Phone = '' : organization.Phone = organization.Phone.trim();
      organization.Comments == null ? organization.Comments = '' : organization.Comments = organization.Comments.trim();
      organization.Contact == null ? organization.Contact = '' : organization.Contact = organization.Contact.trim();
    }
    return organizations;
  }

  public trimResultFromUpdate(organization: Organization) {
    organization.Name = organization.Name.trim();
    organization.email = organization.email.trim();
    organization.Address == null ? organization.Address = '' : organization.Address = organization.Address.trim();
    organization.Phone == null ? organization.Phone = '' : organization.Phone = organization.Phone.trim();
    organization.Comments == null ? organization.Comments = '' : organization.Comments = organization.Comments.trim();
    organization.Contact == null ? organization.Contact = '' : organization.Contact = organization.Contact.trim();
    return organization;
  }
}
