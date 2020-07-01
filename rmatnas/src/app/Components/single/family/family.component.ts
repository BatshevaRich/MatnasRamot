import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit, ElementRef } from '@angular/core';
import { Family } from '../../../Classes/Family';
import { OnDestroy } from '@angular/core';
import { FamilyService } from '../../../services/family.service';
import { Category } from '../../../Classes/Category';
import { FamilyFComponent } from '../../forms/family-f/family-f.component';
import { MatDialog } from '@angular/material/dialog';
import { MatTabChangeEvent } from '@angular/material/tabs';
@Component({
  selector: 'app-family',
  templateUrl: './family.component.html',
  styleUrls: ['./family.component.css']
})
export class FamilyComponent implements OnInit, OnDestroy, AfterViewInit {
  family: Family = new Family('...', '...', '...', '0', '0', '0', '...', '...', 2, '...', '...');
  id: number;
  categories: Category[] = [];
  @Input() vId: number;
  @Input() toV: boolean;
  smallest = '20%';
  small = '80%';
  large = '100%';
  largest = '0%';
  @Output() addedFamily: EventEmitter<Family> = new EventEmitter<Family>();
  chooseTab: string;
  selectedTabIndex: any;
  showEvent: boolean;
  showVolunteer = true;
  showVolunteerings: boolean;
  constructor(public fs: FamilyService,
              public dialog: MatDialog,
              private elementRef: ElementRef) { }

  ngOnInit() { }

  ngAfterViewInit() {
    this.fs.getFamily(this.vId).subscribe((f: Family) => {
      this.family = this.fs.trimResultFromUpdate(f);
      this.fs.getCategoriesOfFamily(this.vId).subscribe((c: Category[]) => {
        this.categories = c;
      });
    });
  }
  ngOnDestroy(): void {
    this.elementRef.nativeElement.remove();
  }

  FamilyopenDialog() {
    const dialogRef = this.dialog.open(FamilyFComponent, {
      data: {
        dataKey: this.family,
        update: true,
        id: this.family.Id,
        chosenC: this.categories
      }
    });
    dialogRef.afterClosed().subscribe(res => {
      this.addedFamily.emit(res);
    });
  }

  onTabChange(event: MatTabChangeEvent) {
    setTimeout(() => {
      this.selectedTabIndex = event;
      if (event.index === 3) {
        this.showEvent = true;
      }
      if (event.index === 1) {
        this.showVolunteer = true;
      }
      if (event.index === 2) {
        this.showVolunteerings = true;
      }
    });
  }
}
