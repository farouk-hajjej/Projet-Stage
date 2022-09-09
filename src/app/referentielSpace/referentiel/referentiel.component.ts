import {Component, Input, OnInit} from '@angular/core';
import {QuestionService} from '../../_services/question.service';
import {ShereService} from '../../_services/shared/shere.service';
import {Question} from '../../model/Question';
import {ReferentielService} from '../../_services/referentiel.service';
import {Referentiel} from '../../model/referentiel';
import {Categorie} from '../../model/Categorie';
import {Domain} from '../../model/Domain';
import {Mesure} from '../../model/Mesure';
import {User} from '../../model/User';
import {CategorieService} from '../../_services/categorie.service';
import {DomainService} from '../../_services/domain.service';
import {MesureService} from '../../_services/mesure.service';
import {UserService} from '../../_services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-referentiel',
  templateUrl: './referentiel.component.html',
  styleUrls: ['./referentiel.component.css']
})
export class ReferentielComponent implements OnInit {

constructor(private referentielService: ReferentielService, private service: ShereService, private categorieService: CategorieService, private  domainService: DomainService, private  mesureService: MesureService, private questionService: QuestionService, private router: Router) { }
  @Input() re: Referentiel = new Referentiel();
  Referentiel = new Referentiel();
  listReferentiel: Referentiel[] = [];
  listCat: Categorie[];
  listDom: Domain[];
  listMes: Mesure[];
  listQes: Question[];

  idR: number;
  idC: number;
  idD: number;
  idM: number;
  idQ: number;
  idU: number;

  ngOnInit(): void {
    console.log(this.idR);
    this.getListReferentiel();
    this.getListCategorie();
    this.getListDomains();
    this.getListMesures();
    this.getListQuestions();
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
  UpdateReferentiel(r: Referentiel, id: number) {
    this.referentielService.updateReferentiel(r, id).subscribe(
      data => {
        console.log(data);
        this.getListReferentiel();
      });
  }

  addReferentiel() {
    this.referentielService.addReferentiel(this.re, this.idC, this.idD, this.idM, this.idQ).subscribe(
      data => {
        this.getListReferentiel();
        this.getid();
      });
  }

   getListCategorie() {
     this.categorieService.getListCategories().subscribe(
       (data: Categorie[]) => {
         this.listCat = data;
       });

     return this.listCat;
  }

   getListDomains() {
     this.domainService.getListDomains().subscribe(
       (data: Domain[]) => {
         this.listDom = data;
       });

     return this.listDom;
  }

   getListMesures() {
     this.mesureService.getListMesure().subscribe(
       (data: Mesure[]) => {
         this.listMes = data;
       });

     return this.listMes;
  }

  private getListQuestions() {
    this.questionService.getListQuestion().subscribe(
      (data: Question[]) => {
        this.listQes = data;
      });

    return this.listQes;

  }

 public SearchReferentiel(key: any): void {
    console.log(key);
    const results: any[] = [];
    for (const s of this.listReferentiel) {
      if (s.code.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(s);
      }
    }
    this.listReferentiel = results;
    if (!key) {
      this.getListReferentiel();
    }

  }

  GoToDomainSpace() {
    this.router.navigate(['/home/Referentiel-management/Domaine']);
  }
}
