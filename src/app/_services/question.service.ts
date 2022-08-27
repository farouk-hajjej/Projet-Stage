import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../model/User';
import {Question} from '../model/Question';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http: HttpClient) { }

  getListQuestion(): Observable<Question[]> {
    return this.http.get<Question[]>('http://localhost:8090/Question/retrieve-All-Questions');
  }

  addQuestion(q: Question): Observable<User>
  {
    const headers = { 'content-type': 'application/json'};
    const body = JSON.stringify(q);
    console.log(body);
    return this.http.post<User>('http://localhost:8090/Question/addQuestion', q);
  }

  updateUser(q: Question, i: number): Observable<any>
  {
    return this.http.put<any>
    ('http://localhost:8090/Question/updateQuestionById/' + i, q);
  }

  deleteQuestion(i: number): Observable<any> {

    return this.http.get<number>('http://localhost:8090/Question/deleteQuestionById/' + i);
  }
}
