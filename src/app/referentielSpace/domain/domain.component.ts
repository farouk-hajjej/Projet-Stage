import {Component, Input, OnInit} from '@angular/core';
import {QuestionService} from '../../_services/question.service';
import {ShereService} from '../../_services/shared/shere.service';
import {Question} from '../../model/Question';
import {DomainService} from '../../_services/domain.service';
import {Domain} from '../../model/Domain';

@Component({
  selector: 'app-domain',
  templateUrl: './domain.component.html',
  styleUrls: ['./domain.component.css']
})
export class DomainComponent implements OnInit {

  constructor(private domainService: DomainService, private service: ShereService) { }
  @Input() do: Domain = new Domain();
  domain = new Domain();
  listdomain: Domain[] = [];
  idD: number;

  ngOnInit(): void {
    console.log(this.idD);
    this.getListDomains();
  }

  getListDomains() {
    this.domainService.getListDomains().subscribe(
      (data: Domain[]) => {
        this.listdomain = data;
      });

    return this.listdomain;

  }
  addDomain() {
    this.domainService.addDomain(this.do).subscribe(
      data => {
        this. getListDomains();
      });
  }

  UpdateDomaine(d: Domain, id: number) {

    this.domainService.updateDomain(d, id).subscribe(
      data => {
        console.log(data);
        this.getListDomains();
      });
  }

  deleteDomain(i: number) {
    this.domainService.deleteDomain(i)
      .subscribe(response => {
        this.listdomain = this.listdomain.filter(item => item.idDom !== i);
      });
  }


  getid() {
    return this.service.getDate();
  }

  dataId(i: number) {
    console.log(i);
    this.idD = i;
    this.do = this.listdomain.filter(item => item.idDom === i)[0];
  }

  public SearchDomain(key: any): void {
    console.log(key);
    const results: any[] = [];
    for (const s of this.listdomain) {
      if (s.codeDomaine.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(s);
      }
    }
    this.listdomain = results;
    if (!key) {
      this.getListDomains();
    }

  }
}
