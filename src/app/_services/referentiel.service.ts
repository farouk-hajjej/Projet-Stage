import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Question} from '../model/Question';
import {Referentiel} from '../model/referentiel';

@Injectable({
  providedIn: 'root'
})
export class ReferentielService {

  constructor(private http: HttpClient) { }

  getListReferentiel(): Observable<Referentiel[]> {
    return this.http.get<Referentiel[]>('http://localhost:8090/Referentiel/retrieve-All-Referentiels');
  }
  deleteReferentiel(i: number): Observable<any> {

    return this.http.get<number>('http://localhost:8090/Referentiel//deleteReferentielById/' + i);
  }
}
