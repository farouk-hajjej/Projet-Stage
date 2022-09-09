import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Categorie} from '../model/Categorie';
import {Referentiel} from '../model/referentiel';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {

  constructor(private http: HttpClient) { }

  getListCategories(): Observable<Categorie[]> {
    return this.http.get<Categorie[]>('http://localhost:8090/Categorie/retrieve-All-Categorys');
  }
  updateCategorie(c: Categorie, i: number): Observable<any>
  {
    return this.http.put<any>
    ('http://localhost:8090/Categorie/updateCategoryById/' + i, c);
  }
  addCategorie(c: Categorie,  idD: number): Observable<Categorie>
  {
    const headers = { 'content-type': 'application/json'};
    const body = JSON.stringify(c);
    console.log(body);
    return this.http.post<Categorie>('http://localhost:8090/Categorie/AddCategoryAndAssignToDomain/'  + idD , c);

  }
  deleteCategorie(i: number): Observable<any> {

    return this.http.get<number>('http://localhost:8090/Categorie/deleteCategoryById/' + i);
  }

}
