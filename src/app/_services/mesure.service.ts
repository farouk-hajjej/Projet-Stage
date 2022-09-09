import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Question} from '../model/Question';
import {Mesure} from '../model/Mesure';

@Injectable({
  providedIn: 'root'
})
export class MesureService {

  constructor(private http: HttpClient) { }

  getListMesure(): Observable<Mesure[]> {
    return this.http.get<Mesure[]>('http://localhost:8090/Mesure/retrieve-All-Mesures');
  }
}
