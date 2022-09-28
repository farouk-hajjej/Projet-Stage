import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Referentiel} from '../model/referentiel';


@Injectable({
  providedIn: 'root'
})
export class ReferentielService {

  constructor(private http: HttpClient) { }
  updateReferentiel(r: Referentiel, i: number): Observable<any>
  {
    return this.http.put<any>
    ('http://localhost:8090/user/updateUserById/' + i, r);
  }
  addReferentiel(r: Referentiel, idC: number, idD: number, idM: number, idQ: number): Observable<Referentiel>
  {
    const headers = { 'content-type': 'application/json'};
    const body = JSON.stringify(r);
    console.log(body);
    return this.http.post<Referentiel>('http://localhost:8090/Referentiel/AddReferentielAndAssignToOthers/' + idD + '/'  + idQ , r);

  }
  getListReferentiel(): Observable<Referentiel[]> {
    return this.http.get<Referentiel[]>('http://localhost:8090/Referentiel/retrieve-All-Referentiels');
  }
  deleteReferentiel(i: number): Observable<any> {

    return this.http.get<number>('http://localhost:8090/Referentiel/deleteReferentielById/' + i);
  }

}
