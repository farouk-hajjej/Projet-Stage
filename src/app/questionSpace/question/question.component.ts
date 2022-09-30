import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
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
  @ViewChild('name') nameKey!: ElementRef;
  @Input() qs: Question = new Question();
  question = new Question();
  listQuestions: Question[] = [];
  idQ: number;
  public name = '';

  ngOnInit(): void {
    console.log(this.idQ);
    this.name = localStorage.getItem('name')!;
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

    this.questionService.updateQuestion(q, id).subscribe(
      data => {
        console.log(data);
        this.getListQuestion();
      });
  }

  deleteQuestion(i: number) {

    this.questionService.deleteQuestion(i)
      .subscribe(response => {
        this.listQuestions = this.listQuestions.filter(item => item.idQes !== i);
      });
  }


  getid() {
    return this.service.getDate();
  }

  dataId(i: number) {
    console.log(i);
    this.idQ = i;
    this.qs = this.listQuestions.filter(item => item.idQes === i)[0];
  }

 public SearchQuestion(key: any): void {
    console.log(key);
    const results: any[] = [];
    for (const s of this.listQuestions) {
      if (s.code.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(s);
      }
    }
    this.listQuestions = results;
    if (!key) {
      this.getListQuestion();
    }

  }
}
