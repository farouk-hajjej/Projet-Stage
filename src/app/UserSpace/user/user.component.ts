import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../model/User';
import {UserService} from '../../_services/user.service';
import {ShereService} from '../../_services/shared/shere.service';
import {NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels} from '@techiediaries/ngx-qrcode';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {


  constructor(private userService: UserService, private service: ShereService, private router: Router) {
  }

  @Input() us: User = new User();
  user = new User();
  listUser: User[] = [];
  elementType = NgxQrcodeElementTypes.URL;
  correctionLevel = NgxQrcodeErrorCorrectionLevels.MEDIUM;

  idU: number;
  public imagePath: FileList;
  key: any;
  imgURL: any;
 // page: number = 1; // 0 1 2 3
  // size: number = 2;
//  numElement: number = 5;
  message: string;


  searchInput = {displayName: '', email: ''};

  ngOnInit(): void {
    console.log(this.idU);
    this.getListUser();

  }


  dataId(i: number) {
    console.log(i);
    this.idU = i;
    this.us = this.listUser.filter(item => item.id === i)[0];
  }

  getListUser() {
    this.userService.getListUser().subscribe(
      (data: User[]) => {
        this.listUser = data;
      });

    return this.listUser;

  }

  /*
  onSuccess(message) {
    this.ser.success('Succée', message, {
      position: ['bottom', 'right'],
      timeOut: 2000,
      animate: 'fade',
      showProgressBar: true
    });
  }

   */
  addUser() {
    this.userService.addUser(this.us).subscribe(
      data => {
        this.getListUser();
        this.message = `un nouvel utilisateur est ajouté avec succès`;
        this.showMessage();

      });
    const formData = new FormData();
    for (let i = 0; i < this.imagePath.length; i++) {
      const element = this.imagePath[i];

      formData.append('files', element);
    }
    this.userService.uploadFile(formData, this.user.id).subscribe(res => {
      console.log(res);
    });
  }

  UpdateUser(u: User, id: number) {

    this.userService.updateUser(u, id).subscribe(
      data => {
        console.log(data);
        this.getListUser();
        this.message = `L'utilisateur d'id:${id} à été mis à jour avec succès`;
        this.showMessage();
      });
  }

  deleteUser(i: number) {
    this.userService.deleteUser(i)
      .subscribe(response => {
        this.listUser = this.listUser.filter(item => item.id !== i);
        this.message = `L'utilisateur d'id: ${i} est supprimé!!`;
        this.showMessage();
      });
  }
  showMessage(){
    setTimeout(() => {
      this.message = '';
    }, 3000);
  }

  getid() {
    return this.service.getDate();
  }

  onFileSelected(event: any) {

    const file: FileList = event?.target?.files;


    let reader = new FileReader();

    this.imagePath = file;

    reader.readAsDataURL(file[0]);
    // tslint:disable-next-line:variable-name
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    };
  }

  public SearchUser(key: any): void {
    console.log(key);
    const results: any[] = [];
    for (const s of this.listUser) {
      if (s.displayName.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(s);
      }
    }
    this.listUser = results;
    if (!key) {
      this.getListUser();
    }

  }

  SearchMultiple(key: string): void {
    this.userService.SerachMultiple(key).subscribe(
      (data: User[]) => {
        this.listUser = data;
      }
    );
  }


  SearchHistrique(key: string): void {
    this.userService.SerachRepi(key).subscribe(data => {
        console.log(data);
      }
    );
  }
  done() {
    this.getListUser();
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
        link.download = 'Users.pdf';
        link.dispatchEvent(new MouseEvent('click', {bubbles: true, cancelable: true , view: window}));
        // tslint:disable-next-line:only-arrow-functions
        setTimeout(function() {
          window.URL.revokeObjectURL(data);
          console.log(data);
          link.remove();
        }, 100);
      });

  }

  goToExportFormat() {
    this.router.navigate(['/home/Administration-management/users/export']);
  }
}
