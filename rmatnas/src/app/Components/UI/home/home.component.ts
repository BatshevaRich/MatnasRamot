import { Component, OnInit, AfterViewInit, ElementRef, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from '../../../services/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {

  familyBadge = 0;
  eventBadge = 0;
  constructor(public dialog: MatDialog,
              public router: Router,
              public ns: NotificationService,
              private elementRef: ElementRef,
              private cdr: ChangeDetectorRef) { }

  ngAfterViewInit() {
    this.familyBadge = this.ns.Families.length;
    this.eventBadge = this.ns.Events.length;
    this.cdr.detectChanges();
  }

  ngOnInit() { }

  ngOnDestroy(): void {
    this.elementRef.nativeElement.remove();
  }

}
