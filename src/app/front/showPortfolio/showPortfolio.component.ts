import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Ng2IzitoastService } from 'ng2-izitoast';
import { AppComponent } from '../../app.component';
import { NgForOf } from '@angular/common';
import { ShowPortfolioService } from './showPortfolio.service';

@Component({
    selector: 'portfolio',
    templateUrl: './showPortfolio.component.html',
    styleUrls: ['./showPortfolio.component.css']
})
export class ShowPortfolioComponent implements OnInit {
    private user: string;
    private error: string;
    private portfolio: any;

    constructor(appComponent: AppComponent, private router: Router, private route: ActivatedRoute, public showPortfolioService: ShowPortfolioService, public iziToast: Ng2IzitoastService) {
        this.user = appComponent.mysession();
    }
    
    /**
     * Implémentation de la méthod ngOnInit de OnInit interface 
     * Angular Interface
     */
    public ngOnInit(): void {
        // Call Get All Portfolios
        let id = this.route.snapshot.params['id'];
        this.get(id);
    }

    private get(id: number): void {
        this.showPortfolioService.get(id)
        .subscribe(result => {
            this.portfolio = result.data;
        }, error => this.error + " Ouuuups une erreur est survenue sur le serveur, veuillé réessayer plus tard");
    }

}