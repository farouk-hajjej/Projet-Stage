import { Component, OnInit } from '@angular/core';
import {UserService} from '../../_services/user.service';

@Component({
  selector: 'app-export-user',
  templateUrl: './export-user.component.html',
  styleUrls: ['./export-user.component.css']
})
export class ExportUserComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  exportpdf() {
    this.userService.exportPdfUser().subscribe(
      x => {
        const blob = new Blob([x], {type: 'application/pdf'});
        if (window.navigator && window.navigator.msSaveOrOpenBlob){
          window.navigator.msSaveOrOpenBlob(blob);
          return;
        }
        const data = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = data;
        link.download = 'ListUsers.pdf';
        link.dispatchEvent(new MouseEvent('click', {bubbles: true, cancelable: true , view: window}));
        // tslint:disable-next-line:only-arrow-functions
        setTimeout(function() {
          window.URL.revokeObjectURL(data);
          console.log(data);
          link.remove();
        }, 100);
      });
  }
  public exportExcel() {
    this.userService.exportExcelUser().subscribe(
      x => {
        const blob = new Blob([x], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,'});
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
          window.navigator.msSaveOrOpenBlob(blob);
          return;
        }
        const data = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = data;
        link.download = 'ListUsers.xlsx';
        link.dispatchEvent(new MouseEvent('click', {bubbles: true, cancelable: true, view: window}));
        // tslint:disable-next-line:only-arrow-functions
        setTimeout(function() {
          window.URL.revokeObjectURL(data);
          link.remove();
        }, 100);
      });

  }
}
