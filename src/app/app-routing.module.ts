import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './Back-End/home/home.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {UserComponent} from './UserSpace/user/user.component';
import {QuestionComponent} from './questionSpace/question/question.component';
import {ExportUserComponent} from './UserSpace/export-user/export-user.component';
import {ReferentielComponent} from './referentielSpace/referentiel/referentiel.component';
import {DomainComponent} from './referentielSpace/domain/domain.component';
import {CategorieComponent} from './referentielSpace/categorie/categorie.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path: 'Administration-management',
        children: [
          {path: 'User', component: UserComponent},
          {path: 'users/export', component: ExportUserComponent},
        ]
      },
      {
        path: 'Evaluation-management',
        children: [
          {path: 'Question', component: QuestionComponent},
        ]
      },
      {
        path: 'Referentiel-management',
        children: [
          {path: 'Referentiel', component: ReferentielComponent},
          {path: 'Domaine', component: DomainComponent},
          {path: 'Categorie', component: CategorieComponent},
        ]
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
