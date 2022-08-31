import {Component, Input, OnInit} from '@angular/core';
import {QuestionService} from '../../_services/question.service';
import {ShereService} from '../../_services/shared/shere.service';
import {Question} from '../../model/Question';
import {ReferentielService} from '../../_services/referentiel.service';
import {Referentiel} from '../../model/referentiel';

@Component({
  selector: 'app-referentiel',
  templateUrl: './referentiel.component.html',
  styleUrls: ['./referentiel.component.css']
})
export class ReferentielComponent implements OnInit {

  constructor(private referentielService: ReferentielService, private service: ShereService) { }
  @Input() re: Referentiel = new Referentiel();
  Referentiel = new Referentiel();
  listReferentiel: Referentiel[] = [];
  idR: number;

  ngOnInit(): void {
    console.log(this.idR);
    this.getListReferentiel();
  }

   getListReferentiel() {
     this.referentielService.getListReferentiel().subscribe(
       (data: Referentiel[]) => {
         this.listReferentiel = data;
       });

     return this.listReferentiel;
  }
  deleteReferentiel(i: number) {
    this.referentielService.deleteReferentiel(i)
      .subscribe(response => {
        this.listReferentiel = this.listReferentiel.filter(item => item.idRef !== i);
      });
  }


  getid() {
    return this.service.getDate();
  }

  dataId(i: number) {
    console.log(i);
    this.idR = i;
    this.re = this.listReferentiel.filter(item => item.idRef === i)[0];
  }
}
