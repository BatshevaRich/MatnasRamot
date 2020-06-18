import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { UserAuth } from '../Classes/UserAuth';
import { User } from '../Classes/User';
import { LOGIN_MOCKS } from './login-mocks';
@Injectable({
  providedIn: 'root'
})
export class SecurityService {
  securityObject: UserAuth = new UserAuth();
  constructor() { }

  resetSecurityObject(): void {
    this.securityObject.userName = '';
    this.securityObject.bearerToken = '';
    this.securityObject.isAuthenticated = false;
    this.securityObject.canAccessVolunteers = false;
    this.securityObject.canAddVolunteer = false;
    this.securityObject.canSaveVolunteer = false;
    this.securityObject.canAccessCategories
      = false;
    this.securityObject.canAddCategory = false;
    localStorage.removeItem('bearerToken');
  }

  login(entity: User):
    Observable<UserAuth> {
    this.resetSecurityObject();
    Object.assign(this.securityObject,
      LOGIN_MOCKS.find(
        user => user.userName.toLowerCase() ===
          entity.userName.toLowerCase()));
    if (this.securityObject.userName !== '') {
      localStorage.setItem('bearerToken',
        this.securityObject.bearerToken);
    }
    return of<UserAuth>(this.securityObject);
  }

  logout(): void {
    this.resetSecurityObject();
  }
}
