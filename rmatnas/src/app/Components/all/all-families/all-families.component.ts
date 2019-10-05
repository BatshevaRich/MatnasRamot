import { Component, OnInit } from '@angular/core';
import { Family } from '../../../classes/Family';
import { FamilyService } from 'src/app/services/family.service';
@Component({
  selector: 'app-all-families',
  templateUrl: './all-families.component.html',
  styleUrls: ['./all-families.component.css']
})
export class AllFamiliesComponent implements OnInit {
  families: Family[] = [];

  search = '';
  constructor(public fs: FamilyService) {}

  ngOnInit() {
    this.fs.getFamilies().subscribe(data => {
      this.families = data;
      console.log(this.families);
    });
  }
}
