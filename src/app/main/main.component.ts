import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ContactComponent } from '../contact/contact.component';
// import { LoggingService } from '../services/logging.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent {
  constructor(
    public dialog: MatDialog,
    // private loggingService: LoggingService
  ) {}

  ngOnInit(): void {
    // this.loggingService.logPageView(null, '/'); 
  }

  openDialog(): void {
    let dialogWidth = '600px';
    if (window.innerWidth < 768) {
      dialogWidth = '95%';
    }

    const dialogRef = this.dialog.open(ContactComponent, {
      width: dialogWidth
 
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }
}