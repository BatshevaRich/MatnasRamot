import { Component, OnInit, Input } from '@angular/core';
import { Family } from '../../../Classes/Family';
import { FamilyService } from 'src/app/services/family.service';
@Component({
  selector: 'app-all-families',
  templateUrl: './all-families.component.html',
  styleUrls: ['./all-families.component.css']
})
export class AllFamiliesComponent implements OnInit {
  families: Family[] = [];
  @Input() vId: number;
  search = '';
  constructor(public fs: FamilyService) { }

  inp = false;
  ngOnInit() {
    if (this.vId) {
      this.inp = true;
      this.fs.getFamiliesByVolunteer(this.vId).subscribe(data => {
        this.families = data;
        console.log(data);
      });
     } else {
      this.fs.getFamilies().subscribe(data => {
        this.families = data;
      });
    }
  }

  delete(f: number) {
    this.fs.removeFamily(f);
    this.families = this.families.filter(fo => fo.Id !== f);
  }
}
