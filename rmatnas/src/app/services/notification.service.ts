import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Family } from '../Classes/Family';
import { environment } from '../../environments/environment';
import { Category } from '../Classes/Category';
import { Volunteer } from '../Classes/Volunteer';
import { Organization } from '../Classes/Organization';
import { Eventt } from '../Classes/Eventt';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  path = environment.baseURL + 'warning';
  updateFamily$: Observable<number>;
  private updateFamilySubject: Subject<number>;
  updateEvent$: Observable<number>;
  private updateEventSubject: Subject<number>;
  familiesToConnect: Family[] = [];
  volunteerToConnect: Volunteer[] = [];
  OrganizationsToConnect: Organization[] = [];
  EventsToConnect: Eventt[] = [];
  CategoriesNotInUse: Category[] = [];
  constructor(public http: HttpClient) {
    this.updateFamilySubject = new Subject<number>();
    this.updateFamily$ = this.updateFamilySubject.asObservable();
    this.updateEventSubject = new Subject<number>();
    this.updateEvent$ = this.updateEventSubject.asObservable();
  }

  public get Families(): Family[] {
    return this.familiesToConnect;
  }

  public set Families(f: Family[]) {
    this.updateFamilySubject.next(f.filter(x => x.color).length);
    this.familiesToConnect = f;
  }

  public get Events(): Eventt[] {
    return this.EventsToConnect;
  }

  public set Events(e: Eventt[]) {
    this.updateEventSubject.next(e.filter(x => x.color).length);
    this.EventsToConnect = e;
  }

  public get Volunteers(): Volunteer[] {
    return this.volunteerToConnect;
  }

  public get Organizations(): Organization[] {
    return this.OrganizationsToConnect;
  }

  public get Categories(): Category[] {
    return this.CategoriesNotInUse;
  }

  async loadAll() {
    const res = await Promise.all([this.getAllFamiliesToConnect(), this.getAllEventsToConnect()]);
  }

  async getAllFamiliesToConnect() {
    const res = await this.http.get<Family[]>(this.path + '/family').toPromise();
    this.familiesToConnect = res;
  }

  getAllVolunteersToConnect() {
    return this.http.get<Volunteer[]>(environment.baseURL + '/getvolunteerstoconnect').subscribe((res: Volunteer[]) => {
      this.volunteerToConnect = res;
    });
  }

  getAllOrganiztionsToConnect() {
    return this.http.get<Organization[]>(environment.baseURL + '/getorganizationstoconnect').subscribe((res: Organization[]) => {
      this.OrganizationsToConnect = res;
    });
  }

  async getAllEventsToConnect() {
    const res = await this.http.get<Eventt[]>(this.path + '/event').toPromise();
    this.EventsToConnect = res;
  }

  getAllCategoriesNotInUse() {
    return this.http.get<Category[]>(environment.baseURL + '/getcategoriesnotinuse').subscribe((res: Category[]) => {
      this.CategoriesNotInUse = res;
    });
  }
}
