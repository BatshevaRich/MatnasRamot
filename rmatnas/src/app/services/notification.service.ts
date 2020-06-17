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
  constructor(http: HttpClient) { }
}
