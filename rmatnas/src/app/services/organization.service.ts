import { Injectable } from '@angular/core';
import { Organization } from '../Classes/Organization';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {
  path = environment.baseURL + 'organization';
  constructor(private http: HttpClient) { }
  getOrganizations(): Observable<Organization[]> {
    return this.http.get<Organization[]>(this.path);
  }
}
