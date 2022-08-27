import {Component, Input, OnInit} from '@angular/core';
import {QuestionService} from '../../_services/question.service';
import {Question} from '../../model/Question';
import {User} from '../../model/User';
import {ShereService} from '../../_services/shared/shere.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  constructor(private questionService: QuestionService, private service: ShereService) { }
  @Input() qs: Question = new Question();
  question = new Question();
  listQuestions: Question[] = [];
  idQ: number;

  ngOnInit(): void {
    console.log(this.idQ);
    this.getListQuestion();
  }

  getListQuestion() {
    this.questionService.getListQuestion().subscribe(
      (data: Question[]) => {
        this.listQuestions = data;
      });

    return this.listQuestions;

  }
  addQuestion() {
    this.questionService.addQuestion(this.qs).subscribe(
      data => {
        this. getListQuestion();
      });
  }

  UpdateQuestion(q: Question, id: number) {

    this.questionService.updateUser(q, id).subscribe(
      data => {
        console.log(data);
        this.getListQuestion();
      });
  }

  deleteQuestion(i: number) {
    this.questionService.deleteQuestion(i)
      .subscribe(response => {
        this.listQuestions = this.listQuestions.filter(item => item.id !== i);
      });
  }


  getid() {
    return this.service.getDate();
  }

  dataId(i: number) {
    console.log(i);
    this.idQ = i;
    this.qs = this.listQuestions.filter(item => item.id === i)[0];
  }
}
