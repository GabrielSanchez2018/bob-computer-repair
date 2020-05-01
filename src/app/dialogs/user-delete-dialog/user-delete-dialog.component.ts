/*=========================
Name: Brittany Dockter, Justin Singleton, Gabriel Sanchez
Date: April 19, 2020
Assignment: user delete dialog
Description: backend for user delete dialog page
==========================-*/

import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-user-delete-dialog',
  templateUrl: './user-delete-dialog.component.html',
  styleUrls: ['./user-delete-dialog.component.css']
})
export class UserDeleteDialogComponent implements OnInit {
	username: string;
	constructor(private dialogRef: MatDialogRef<UserDeleteDialogComponent>, @Inject(MAT_DIALOG_DATA) data) {
		this.username = data.username;
	}

	ngOnInit() {
	}
}