import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Categorie} from '../model/Categorie';
import {Domain} from '../model/Domain';
import {Question} from '../model/Question';

@Injectable({
  providedIn: 'root'
})
export class DomainService {
  constructor(private http: HttpClient) { }

  getListDomains(): Observable<Domain[]> {
    return this.http.get<Domain[]>('http://localhost:8090/Domaine/retrieve-All-Domains');
  }
  addDomain(d: Domain): Observable<Domain>
  {
    const headers = { 'content-type': 'application/json'};
    const body = JSON.stringify(d);
    console.log(body);
    return this.http.post<Domain>('http://localhost:8090/Domaine/addDomain', d);
  }

  updateDomain(d: Domain, i: number): Observable<any>
  {
    return this.http.put<any>
    ('http://localhost:8090/Domaine/updateDomainById/' + i, d);
  }

  deleteDomain(i: number): Observable<any> {

    return this.http.get<number>('http://localhost:8090/Domaine/deleteDomainById/' + i);
  }
}
