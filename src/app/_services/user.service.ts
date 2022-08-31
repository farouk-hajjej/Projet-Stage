import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConstants } from '../common/app.constants';
import {User} from '../model/User';


const httpOptions = {
headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private http: HttpClient) { }
  getListUser(): Observable<User[]> {
    return this.http.get<User[]>('http://localhost:8090/user/retrieve-All-Users');
  }
 // onSuccess(message){
  //  this.notser.success('Succée', message , {
   //   position:['bottom', 'right'],
   //   timeOut: 2000,
     // animate: 'fade',
    //  showProgressBar: true

   // });
 // }
  // onError(message){
   // this.notser.error('Echec', message , {
     // position:['bottom', 'right'],
     // timeOut: 2000,
     // animate: 'fade',
    //  showProgressBar: true

    // });
 // }
  addUser(u: User): Observable<User>
  {
    const headers = { 'content-type': 'application/json'};
    const body = JSON.stringify(u);
    console.log(body);
    return this.http.post<User>('http://localhost:8090/user/addUser', u);
  }

  deleteUser(i: number): Observable<any> {

    return this.http.get<number>('http://localhost:8090/user/deleteUserById/' + i);
  }
  updateUser(u: User, i: number): Observable<any>
  {
    return this.http.put<any>
    ('http://localhost:8090/user/updateUserById/' + i, u);
  }
  SerachRepi(key: string): Observable<any>
  {
    return this.http.post<string>('http://localhost:8090/user/SearchHistorique/' + key, 1);
  }
  SerachMultiple(key: string): Observable<User[]>
  {
    return this.http.get<User[]>('http://localhost:8090/user/SearchMultiple/' + key);
  }

  getPublicContent(): Observable<any> {
    return this.http.get(AppConstants.API_URL + 'all', { responseType: 'text' });
  }

  getUserBoard(): Observable<any> {
    return this.http.get(AppConstants.API_URL + 'user', { responseType: 'text' });
  }

  getModeratorBoard(): Observable<any> {
    return this.http.get(AppConstants.API_URL + 'mod', { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(AppConstants.API_URL + 'admin', { responseType: 'text' });
  }

  getCurrentUser(): Observable<any> {
    return this.http.get(AppConstants.API_URL + 'user/me', httpOptions);
  }
  uploadFile(file: FormData, i: number): Observable<any>
  {
    return this.http.post<any>('http://localhost:8090/user/uploadMultipleFiles/' + i, file);
  }

  exportPdfUser(): Observable<Blob>
  {
    return this.http.get('http://localhost:8090/user/export/pdf', {responseType: 'blob'} );
  }
  exportExcelUser(): Observable<Blob>
  {
    return this.http.get('http://localhost:8090/user/download/Users.xlsx', {responseType: 'blob'} );
  }
}
