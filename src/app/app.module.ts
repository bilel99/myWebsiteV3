import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Ng2IziToastModule } from 'ng2-izitoast';
import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { AccueilComponent } from './front/accueil/accueil.component';
import { LoginComponent } from './front/login/login.component';
import { PageNotFoundComponent } from './front/error/page-not-found.component';
import { RegisterComponent } from './front/register/register.component';
import { ForgotComponent } from './front/forgot/forgot.component';
import { ForgotStepFinalComponent } from './front/forgot/forgotStepFinal.component';
import { ContactComponent } from './front/contact/contact.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginService } from './front/login/login.service';
import { RegisterService } from './front/register/register.service';
import { ForgotService } from './front/forgot/forgot.service';
import { ContactService } from './front/contact/contact.service';
import { AccountComponent } from './front/account/account.component';
import { AccountService } from './front/account/account.service';
import { PortfolioComponent } from './front/portfolio/portfolio.component';
import { PortfolioService } from './front/portfolio/portfolio.service';
import { TruncatePipe } from './front/portfolio/truncate.pipe';
import { ShowPortfolioComponent } from './front/showPortfolio/showPortfolio.component';
import { ShowPortfolioService } from './front/showPortfolio/showPortfolio.service';
import { CreatePortfolioService } from './front/createPortfolio/createPortfolio.service';
import { CreatePortfolioComponent } from './front/createPortfolio/createPortfolio.component';
import { EditPortfolioComponent } from './front/editPortfolio/editPortfolio.component';
import { EditPortfolioService } from './front/editPortfolio/editPortfolio.service';
import { ShowCvService } from './front/showCv/showCv.service';
import { ShowCvComponent } from './front/showCv/showCv.component';
import { CalcLevelPipe } from './front/showCv/calcLevel.pipe';
import { EditCvComponent } from './front/editCv/editCv.component';
import { EditCvService } from './front/editCv/editCv.service';
import { CreateCvComponent } from './front/createCv/createCv.component';
import { CreateCvService } from './front/createCv/createCv.service';
import { ReactiveFormsModule } from '@angular/forms';
import { BlogComponent } from './front/blog/blog.component';
import { BlogService } from './front/blog/blog.service';


@NgModule({
  declarations: [
    AppComponent, AccueilComponent, LoginComponent, PageNotFoundComponent, RegisterComponent, ForgotComponent, ForgotStepFinalComponent, ContactComponent, AccountComponent, PortfolioComponent, TruncatePipe, ShowPortfolioComponent, CreatePortfolioComponent, EditPortfolioComponent, ShowCvComponent, CalcLevelPipe, EditCvComponent, CreateCvComponent, BlogComponent
  ],
  imports: [
    BrowserModule, Ng2IziToastModule, AppRoutingModule, FormsModule, HttpModule, ReactiveFormsModule
  ],
  providers: [LoginService, RegisterService, ForgotService, ContactService, AccountService, PortfolioService, ShowPortfolioService, CreatePortfolioService, EditPortfolioService, ShowCvService, EditCvService, CreateCvService, BlogService],
  bootstrap: [AppComponent]
})
export class AppModule {}
