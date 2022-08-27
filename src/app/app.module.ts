import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HomeComponent} from './Back-End/home/home.component';
import {LayoutComponent} from './Back-End/layout/layout.component';
import {SidbarComponent} from './Back-End/sidbar/sidbar.component';
import {NavbarComponent} from './Back-End/navbar/navbar.component';
import {FooterComponent} from './Back-End/footer/footer.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {authInterceptorProviders} from './_helpers/auth.interceptor';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import { UserComponent } from './UserSpace/user/user.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgxQRCodeModule} from '@techiediaries/ngx-qrcode';
import {OrderModule} from 'ngx-order-pipe';
import {FilterPipeModule} from 'ngx-filter-pipe';
import { QuestionComponent } from './questionSpace/question/question.component';
import { ExportUserComponent } from './UserSpace/export-user/export-user.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    FooterComponent,
    LoginComponent,
    NavbarComponent,
    SidbarComponent,
    LayoutComponent,
    HomeComponent,
    UserComponent,
    QuestionComponent,
    ExportUserComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgxQRCodeModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    OrderModule,
    FilterPipeModule
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
