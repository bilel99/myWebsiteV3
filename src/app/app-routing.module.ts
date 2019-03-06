import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';
import { AccueilComponent } from './front/accueil/accueil.component';
import { PageNotFoundComponent } from './front/error/page-not-found.component';
import { LoginComponent } from './front/login/login.component';
import { RegisterComponent } from './front/register/register.component';
import { ForgotComponent } from './front/forgot/forgot.component';
import { ForgotStepFinalComponent } from './front/forgot/forgotStepFinal.component';
import { ContactComponent } from './front/contact/contact.component';
import { AccountComponent } from './front/account/account.component';
import { PortfolioComponent } from './front/portfolio/portfolio.component';
import { ShowPortfolioComponent } from './front/showPortfolio/showPortfolio.component';
import { CreatePortfolioComponent } from './front/createPortfolio/createPortfolio.component';
import { EditPortfolioComponent } from './front/editPortfolio/editPortfolio.component';
import { ShowCvComponent } from './front/showCv/showCv.component';
import { EditCvComponent } from './front/editCv/editCv.component';
import { CreateCvComponent } from './front/createCv/createCv.component';
import { BlogComponent } from './front/blog/blog.component';
import { EditBlogComponent } from './front/editBlog/editBlog.component';


// routes
const appRoutes: Routes = [
	// Route for Accueil page
	{ path: 'bilel-bekkouche', component: AccueilComponent },
	// Route for Authentification page
	{ path: 'login', component: LoginComponent },
	{ path: 'register', component: RegisterComponent },
	{ path: 'forgot', component: ForgotComponent },
	{ path: 'forgot-step-final', component: ForgotStepFinalComponent },
	// Route for Contact page
	{ path: 'contact', component: ContactComponent },
	// Route for Account page
	{ path: 'profil/:id', component: AccountComponent },
	// Route for Portfolio Page
	{ path: 'portfolios', component: PortfolioComponent },
	// Route for Show Portfolio Page
	{ path: 'portfolios/:id', component: ShowPortfolioComponent },
	// Route for Create Portfolio Page
	{ path: 'create-portfolio', component: CreatePortfolioComponent },
	// Route for edit portfolio Page
	{ path: 'edit-portfolio/:id', component: EditPortfolioComponent },
	// Route for My CV Page
	{ path: 'cv', component: ShowCvComponent },
	// Route for Create CV Page
	{ path: 'create-cv', component: CreateCvComponent },
	// Route for Edit CV Page
	{ path: 'edit-cv/:id', component: EditCvComponent },
	// Route for BLOG Page
	{ path: 'blog', component: BlogComponent },
	// Route for Edit blog Page
	{ path: 'edit-blog/:id', component: EditBlogComponent },
	// Route for Error - Redirection and page not found
    { path: '', redirectTo: 'bilel-bekkouche', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
	imports: [
		RouterModule.forRoot(appRoutes)
	],
	exports: [
		RouterModule
	],
	providers: []
})
export class AppRoutingModule { }
