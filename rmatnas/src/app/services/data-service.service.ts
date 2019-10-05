import { Injectable } from '@angular/core';
import { Volunteer } from '../classes/Volunteer';
import { Family } from '../classes/Family';
import { Event } from 'src/app/classes/Event';
import { Organization } from 'src/app/classes/Organization';
import { MyTask } from 'src/app/Classes/MyTask';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {User2} from '../user2';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  volunteers: Volunteer[] = []; // init by db
  families: Family[] = [];
  events: Event[] = [];
  organizations: Organization[] = [];
  tasks: MyTask[] = [];
  constructor(private http: HttpClient) {
    this.getVolunteersFromServer();
    this.getFamiliesFromServer();
    console.log('ds ctor called');
    
    /* this.volunteers.push(
      new Volunteer(
        1,
        'me',
        'you',
        '8764563865421',
        '8974635242',
        '1@1',
        'qaz',
        '1/1/1'
      )
    );
    this.families.push(
      // tslint:disable-next-line: max-line-length
      new Family(
        1,
        'שם פרטי אב',
        'שם פרטי אם',
        'שם משפחה',
        '2229870696',
        '1110909990',
        '11995965979',
        'כתובת',
        '111@dk',
        'משפחת מצוקה, בית הרוס, ילדים במצב קשה',
        17,
        'שכנה חפרנית ששמה לב למצוקה הקשה השוררת בביתם',
        'סיבת הפניה'
      )
    );
    this.families.push(
      // tslint:disable-next-line: max-line-length
      new Family(
        2,
        'אב',
        'אם',
        'שם משפחה',
        '22224654',
        '564513246',
        '9845165798',
        'כתובת',
        '111@dk',
        'משפחת מצוקה, בית הרוס, ילדים במצב קשה',
        17,
        'שכנה חפרנית ששמה לב למצוקה הקשה השוררת בביתם',
        'סיבת הפניה'
      )
    );*/
    this.events.push(new Event(1, 'ברירת מחדל', '1999'));
    this.organizations.push(
      new Organization(
        1,
        'ברירת מחדל',
        'ברירת מחדל',
        '879864596',
        'ברירת מחדל',
        'ברירת מחדל',
        '1@1'
      )
    );
    /* this.getVolunteersFromServer();*/
    /*this.tasks.push(new MyTask(1, 'להזמין פרסומת בלוח קיר', '02/05/2019'));
    this.tasks.push(new MyTask(2, 'לברר בקשר למשפחת לוי', '02/05/2019'));
    this.tasks.push(
      new MyTask(3, 'להודיע לאסתי רפפורט לא לבוא השבוע למשחקיה', '02/05/2019')
    );*/
  }
  getVolunteer(id) {
    // go to db
    id = +id;
    return this.volunteers.find(v => {
      return v.Id === id;
    });
  }
  getFamily(id) {
    // go to db
    id = +id;
    return this.families.find(f => {
      return f.id === id;
    });
  }
  getEvent(id) {
    // go to db
    id = +id;
    return this.events.find(e => {
      return e.id === id;
    });
  }
  getOrganization(id) {
    // go to db
    id = +id;
    return this.organizations.find(o => {
      return o.id === id;
    });
  }
  getTask(id) {
    // go to db
    id = +id;
    return this.tasks.find(t => {
      return t.id === id;
    });
  }
  addVolunteer(v: Volunteer) {
    v.Id = this.volunteers.length + 1;
    this.volunteers.push(v);
  }
  addFamily(f: Family) {
    f.id = this.families.length + 1;
    this.families.push(f);
  }
  addOrganization(o: Organization) {
    o.id = this.organizations.length + 1;
    this.organizations.push(o);
  }
  addEvent(e: Event) {
    e.id = this.events.length + 1;
    this.events.push(e);
  }
  addTask(t: MyTask) {
    t.id = this.tasks.length + 1;
    this.events.push(t);
  }
  postS(val:string){
    return this.http.post('http://localhost:57624/api/user/9',val);
  }
  getAllVolunteers() {
    return this.volunteers;
  }
  getAllFamilies() {
    return this.families;
  }
  getAllOrganizations() { 
    return this.organizations;
  }
  getAllEvents() {
    return this.events;
  }
  getAllTasks() {  
    return this.tasks;
  }
  updateFamily(f: Family) {
    const f2 = this.getFamily(f.id);
    f2.FirstNameFather = f.FirstNameFather;
    f2.FirstNameMother = f.FirstNameMother;
    f2.LastName = f.LastName;
    f2.PelephoneFather = f.PelephoneFather;
    f2.PelephoneMother = f.PelephoneMother;
    f2.Telephone = f.Telephone;
    f2.Address = f.Address;
    f2.Email = f.Email;
    f2.NumChildren = f.NumChildren;
    f2.Status = f.Status;
    f2.Reference = f.Reference;
  }

 
  updateEvent(e: Event) {
    const e2 = this.getEvent(e.id);
    e2.description = e.description;
    e2.date = e.date;
  }
  updateOrganization(o: Organization) {
    const o2 = this.getOrganization(o.id);
    o2.name = o.name;
    o2.phone = o.phone;
    o2.address = o.address;
    o2.email = o.email;
    o2.contact = o.contact;
    o2.comments = o.comments;
  }
  getVolunteersFromServer(): Observable<Volunteer[]> {
    return this.http.get<Volunteer[]>('http://localhost:59945/api/volunteer');
  }
  getFamiliesFromServer(): Observable<Family[]> {
    return this.http.get<Family[]>('http://localhost:59945/api/family');
  }
  getVolunteerFromServer(): Observable<Volunteer> {
    return this.http.get<Volunteer>('http://localhost:51229/api/volunteer/1');
  }
}
