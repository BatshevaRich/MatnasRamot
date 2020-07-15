import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { Volunteer } from '../../../Classes/Volunteer';
import { Family } from '../../../Classes/Family';
import { Organization } from '../../../Classes/Organization';
import { Eventt } from '../../../Classes/Eventt';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {
  title: string;
  message: string;
  listOfType: object[] = [];
  type: string;
  listOfFamilies: Family[] = [];
  listOfVolunteers: Volunteer[] = [];
  listOfTypeSelected: object[] = [];
  listOfVolunteersSelected: Volunteer[] = [];
  listOfFamiliesSelected: Family[] = [];
  listOfOrganizations: Organization[] = [];
  listOfOrganizationsSelected: Organization[] = [];
  listOfEvents: Eventt[] = [];
  listOfEventsSelected: Eventt[] = [];
  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogModel) {
    // Update view with given values
    this.title = data.title;
    this.message = data.message;
    this.listOfType = data.listOfType ? data.listOfType : [];
    this.type = data.type || '';
    if (this.listOfType.length > 0 && this.type === 'volunteer') {
      this.listOfVolunteers = data.listOfType as Volunteer[];
    }
    if (this.listOfType.length > 0 && this.type === 'family') {
      this.listOfFamilies = data.listOfType as Family[];
    }
    if (this.listOfType.length > 0 && this.type === 'organization') {
      this.listOfOrganizations = data.listOfType as Organization[];
    }
    if (this.listOfType.length > 0 && this.type === 'event') {
      this.listOfEvents = data.listOfType as Eventt[];
    }
  }

  ngOnInit() {
  }

  onConfirm(): void {
    // Close the dialog, return true
    if (this.type === 'volunteer') {
      this.dialogRef.close(this.listOfVolunteersSelected);
    }
    else if (this.type === 'family') {
      this.dialogRef.close(this.listOfFamiliesSelected);
    }
    else if (this.type === 'organization') {
      this.dialogRef.close(this.listOfOrganizationsSelected);
    }
    else if (this.type === 'event') {
      this.dialogRef.close(this.listOfEventsSelected);
    }
    else { this.dialogRef.close(this.listOfTypeSelected); }
  }

  onDismiss(): void {
    // Close the dialog, return false
    this.dialogRef.close(false);
  }
}

/**
 * Class to represent confirm dialog model.
 *
 * It has been kept here to keep it as part of shared component.
 */
export class ConfirmDialogModel {

  constructor(public title: string, public message: string, public listOfType?: object[], public type?: string) {
  }
}
