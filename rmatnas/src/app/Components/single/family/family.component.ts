import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit, ElementRef } from '@angular/core';
import { Family } from '../../../Classes/Family';
import { Subscription } from 'rxjs';

import { OnDestroy } from '@angular/core';
import { FamilyService } from 'src/app/services/family.service';
import { Category } from 'src/app/Classes/Category';
import { FamilyFComponent } from '../../forms/family-f/family-f.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-family',
  templateUrl: './family.component.html',
  styleUrls: ['./family.component.css']
})
export class FamilyComponent implements OnInit, OnDestroy, AfterViewInit {
  family: Family = new Family('fathername',
    'mothername',
    'lastname',
    '0',
    '0',
    '0',
    'address',
    'status',
    2,
    'reason',
    'reference');
  mySubscription: Subscription;
  id: number;
  categories: Category[] = [];
  mySubscription2: Subscription;
  @Input() vId: number;
  @Input() toV: boolean;
  @Output() addedFamily: EventEmitter<Family> = new EventEmitter<Family>();
  chooseTab: string;
  constructor(public fs: FamilyService,
              public dialog: MatDialog,
              private elementRef: ElementRef) { }

  ngOnInit() { }

  ngAfterViewInit() {
    this.fs.getFamily(this.vId).subscribe(f => {
      this.family = f;
      this.fs.getCategoriesOfFamily(this.vId).subscribe(c => {
        this.categories = c;
      });
      // this.fs.getCategoriesOfFamily(this.fId).subscribe(c => {
      //   this.categories = c;
      // });
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
}
