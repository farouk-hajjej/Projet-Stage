import {Component, Input, OnInit} from '@angular/core';
import {DomainService} from '../../_services/domain.service';
import {ShereService} from '../../_services/shared/shere.service';
import {Domain} from '../../model/Domain';
import {CategorieService} from '../../_services/categorie.service';
import {Categorie} from '../../model/Categorie';

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.css']
})
export class CategorieComponent implements OnInit {

  constructor(private categorieService: CategorieService, private service: ShereService, private domainService: DomainService) { }
  @Input() ca: Categorie = new Categorie();
  categorie = new Categorie();
  listCategorie: Categorie[] = [];
  idC: number;
  idD: number;
  listDom: Domain[];


  ngOnInit(): void {
    console.log(this.idC);
    this.getListCategorie();
    this.getListDomains();
  }
  getListDomains() {
    this.domainService.getListDomains().subscribe(
      (data: Domain[]) => {
        this.listDom = data;
      });

    return this.listDom;
  }

  getListCategorie() {
    this.categorieService.getListCategories().subscribe(
      (data: Categorie[]) => {
        this.listCategorie = data;
      });

    return this.listCategorie;

  }
  addCategorie() {
    this.categorieService.addCategorie(this.ca, this.idD).subscribe(
      data => {
        this.getListCategorie();
        this.getid();
      });
  }

  UpdateCategorie(c: Categorie, id: number) {

    this.categorieService.updateCategorie(c, id).subscribe(
      data => {
        console.log(data);
        this.getListCategorie();
      });
  }

  deleteCategorie(i: number) {
    this.categorieService.deleteCategorie(i)
      .subscribe(response => {
        this.listCategorie = this.listCategorie.filter(item => item.idCat !== i);
      });
  }


  getid() {
    return this.service.getDate();
  }

  dataId(i: number) {
    console.log(i);
    this.idD = i;
    this.ca = this.listCategorie.filter(item => item.idCat === i)[0];
  }

  public SearchDomain(key: any): void {
    console.log(key);
    const results: any[] = [];
    for (const s of this.listCategorie) {
      if (s.codeCategorie.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(s);
      }
    }
    this.listCategorie = results;
    if (!key) {
      this.getListDomains();
    }

  }

}
