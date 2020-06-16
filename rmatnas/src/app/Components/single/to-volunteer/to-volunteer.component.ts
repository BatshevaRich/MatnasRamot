import { Component, OnInit, Input, ElementRef, OnDestroy } from '@angular/core';
import { VolunteerAndFamily } from 'src/app/Classes/VolunteerAndFamily';
import { VolunteerService } from 'src/app/services/volunteer.service';
import { MatDialog } from '@angular/material/dialog';
import { Volunteer } from 'src/app/Classes/Volunteer';
import { VolunteerFComponent } from '../../forms/volunteer-f/volunteer-f.component';
import { VolunteerAndFamilyService } from 'src/app/services/volunteer-and-family.service';
import { Category } from 'src/app/Classes/Category';
import { Family } from 'src/app/Classes/Family';
import { AddVFComponent } from '../../forms/add/add-vf/add-vf.component';

@Component({
  selector: 'app-to-volunteer',
  templateUrl: './to-volunteer.component.html',
  styleUrls: ['./to-volunteer.component.css']
})
export class ToVolunteerComponent implements OnInit, OnDestroy {
  toVolunteer: VolunteerAndFamily = new VolunteerAndFamily(
    new Family('...', '...', '...', '0', '0', '0', '...', '...', 1, '...', '...'),
    new Volunteer('...', '...', '...', '...@...', '...', '1999-01-01', false),
    new Category('...', 0), 'default', '1999-01-01'
  );
  id: number;
  @Input() vId: number;
  @Input() toV: boolean;
  constructor(public vs: VolunteerAndFamilyService,
              public dialog: MatDialog,
              private elementRef: ElementRef) { }

  ngOnDestroy(): void {
    this.elementRef.nativeElement.remove();
  }

  ngOnInit() {
    this.vs.getVolunteering(this.vId).subscribe((v: VolunteerAndFamily) => {
      this.toVolunteer = v;
    });
  }

  ToVolunteeropenDialog() {
    const dialogRef = this.dialog.open(AddVFComponent, {
      data: {
        dataKey: this.toVolunteer,
        update: true,
        id: this.toVolunteer.Id
      }
    });
    dialogRef.afterClosed().subscribe(res => {
    });
  }
}
