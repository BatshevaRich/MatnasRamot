import { Component, OnInit, Input } from '@angular/core';
import { Family } from 'src/app/Classes/Family';
import { Volunteer } from 'src/app/Classes/Volunteer';
import { Category } from 'src/app/Classes/Category';

@Component({
  selector: 'app-add-vf',
  templateUrl: './add-vf.component.html',
  styleUrls: ['./add-vf.component.css']
})
export class AddVFComponent implements OnInit {

  @Input()vOrF: boolean;
  families: Family[] = [new Family(
    1,
    'ברירת מחדל',
    'ברירת מחדל',
    'ברירת מחדל',
    '0',
    '0',
    '0',
    'ברירת מחדל',
    'aaa@a',
    'ברירת מחדל',
    2,
    'לל',
    'לל'
  )];
  // divide into different components?
  volunteers: Volunteer[] = [];
  categories: Category[] = [];
  comments: string;
  dateAdded: Date;
  selectedFamily: Family;
  selectedVolunteer: Volunteer;
  constructor() { }

  ngOnInit() {
  }
  onChangeFamily(newValue) {
    console.log(newValue);
    this.selectedFamily = newValue;
    // ... do other stuff here ...
}
onChangeVolunteer(newValue) {
  console.log(newValue);
  this.selectedVolunteer = newValue;
  // ... do other stuff here ...
}
}
