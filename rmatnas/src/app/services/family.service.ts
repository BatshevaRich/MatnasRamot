import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Family } from '../Classes/Family';
import { environment } from '../../environments/environment';
import { Category } from '../Classes/Category';

@Injectable({
  providedIn: 'root'
})
export class FamilyService {
  // tslint:disable-next-line:member-ordering

  path = environment.baseURL + 'family';
  constructor(private http: HttpClient) { }

  getFamilies(): Observable<Family[]> {
    return this.http.get<Family[]>(this.path);
  }

  getFamiliesByVolunteer(id: number): Observable<Family[]> {
    return this.http.get<Family[]>(environment.baseURL + 'volunteer/families/' + id);
  }
  getFamiliesByOrganization(id: number): Observable<Family[]> {
    return this.http.get<Family[]>(environment.baseURL + 'organization/families/' + id);
  }
  getFamily(id: number): Observable<Family> {
    return this.http.get<Family>(this.path + '/' + id);
  }

  addFamily(family: Family, categories: Category[]) {
    const myData = {} as any;
    myData.family = family;
    myData.categories = categories;
    return this.http.post(this.path, myData);
  }
  updateFamily(family: Family, categoriesSelected: Category[]) {
    // const head={params:new HttpParams() ('newFamily',Family)};
    const myData = {} as any;
    myData.family = family;
    myData.categories = categoriesSelected;
    return this.http.put(
      this.path, myData
    );
  }
  removeFamily(id: number) {
    // const head={params:new HttpParams() ('newFamily',Family)};
    return this.http.delete(this.path + '/' + id);
  }
  getCategoriesOfFamily(id: number): Observable<Category[]> {
    return this.http.get<Category[]>(this.path + '/categoriesOfFamily/' + id);
  }
  getFamiliesByCategoryAndVolunteer(idCategory: number, idVolunteer): Observable<Family[]> {
    return this.http.get<Family[]>(this.path + '/familiesbycategory/' + idCategory, { headers: { Authorization: idVolunteer.toString() } });
  }

  getFamiliesByCategory(idCategory: number): Observable<Family[]> {
    return this.http.get<Family[]>(this.path + '/familiesbycategory/' + idCategory);
  }

  public trimResultsFromDB(families: Family[]) {
    for (const family of families) {
      family.LastName = family.LastName.trim();
      family.FirstNameFather = family.FirstNameFather.trim();
      family.FirstNameMother = family.FirstNameMother.trim();
      family.Address == null ? family.Address = '' : family.Address = family.Address.trim();
      family.Telephone == null ? family.Telephone = '' : family.Telephone = family.Telephone.trim();
      family.PelephoneFather == null ? family.PelephoneFather = '' : family.PelephoneFather = family.PelephoneFather.trim();
      family.PelephoneMother == null ? family.PelephoneMother = '' : family.PelephoneMother = family.PelephoneMother.trim();
      family.Status == null ? family.Status = '' : family.Status = family.Status.trim();
      family.Reference == null ? family.Reference = '' : family.Reference = family.Reference.trim();
      family.Reason == null ? family.Reason = '' : family.Reason = family.Reason.trim();
    }
    return families;
  }

  public trimResultFromUpdate(family: Family) {
    family.LastName = family.LastName.trim();
    family.FirstNameFather = family.FirstNameFather.trim();
    family.FirstNameMother = family.FirstNameMother.trim();
    family.Address == null ? family.Address = '' : family.Address = family.Address.trim();
    family.Telephone == null ? family.Telephone = '' : family.Telephone = family.Telephone.trim();
    family.PelephoneFather == null ? family.PelephoneFather = '' : family.PelephoneFather = family.PelephoneFather.trim();
    family.PelephoneMother == null ? family.PelephoneMother = '' : family.PelephoneMother = family.PelephoneMother.trim();
    family.Status == null ? family.Status = '' : family.Status = family.Status.trim();
    family.Reference == null ? family.Reference = '' : family.Reference = family.Reference.trim();
    family.Reason == null ? family.Reason = '' : family.Reason = family.Reason.trim();
    return family;
  }
}
