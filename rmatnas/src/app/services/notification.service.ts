import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
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
  familiesToConnect: Family[] = [];
  volunteerToConnect: Volunteer[] = [];
  OrganizationsToConnect: Organization[] = [];
  EventsToConnect: Eventt[] = [];
  CategoriesNotInUse: Category[] = [];
  constructor(public http: HttpClient) { }

  public get Families(): Family[] {
    return this.familiesToConnect;
  }

  public get Volunteers(): Volunteer[] {
    return this.volunteerToConnect;
  }

  public get Organizations(): Organization[] {
    return this.OrganizationsToConnect;
  }

  public get Events(): Eventt[] {
    return this.EventsToConnect;
  }

  public get Categories(): Category[] {
    return this.CategoriesNotInUse;
  }

  getAllFamiliesToConnect() {
    return this.http.get<Family[]>(environment.baseURL + '/getfamiliestoconnect').subscribe((res: Family[]) => {
      this.familiesToConnect = res;
    });
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

  getAllEventsToConnect() {
    return this.http.get<Eventt[]>(environment.baseURL + '/geteventstoconnect').subscribe((res: Eventt[]) => {
      this.EventsToConnect = res;
    });
  }

  getAllCategoriesNotInUse() {
    return this.http.get<Category[]>(environment.baseURL + '/getcategoriesnotinuse').subscribe((res: Category[]) => {
      this.CategoriesNotInUse = res;
    });
  }
}
