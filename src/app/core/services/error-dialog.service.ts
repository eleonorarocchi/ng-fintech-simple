import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../components/error-dialog.component';


@Injectable()
export class ErrorDialogService {
    public isDialogOpen: Boolean = false;

    constructor(public dialog: MatDialog) { }

    openDialog(data:string): any {

        if (this.isDialogOpen || data === '') {
            return false;
        }

        this.isDialogOpen = true;

        const dialogRef = this.dialog.open(ErrorDialogComponent, {
            width: '500px',
            data: data
        });

        dialogRef.afterClosed().subscribe(result => {
            this.isDialogOpen = false;
        });
    }
}