import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Ng2IzitoastService } from 'ng2-izitoast';
import { AppComponent } from '../../app.component';
import { PortfolioService } from './portfolio.service';

@Component({
    selector: 'portfolio',
    templateUrl: './portfolio.component.html',
    styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {
    private user: string;
    private error: string;
    private portfolio: any;

    constructor(appComponent: AppComponent, private router: Router, private route: ActivatedRoute, public portfolioService: PortfolioService, public iziToast: Ng2IzitoastService) {
        this.user = appComponent.mysession();
    }
    
    /**
     * Implémentation de la méthod ngOnInit de OnInit interface 
     * Angular Interface
     */
    public ngOnInit(): void {
        // Call Get All Portfolios
        this.getAll();
    }

    private getAll(): void {
        this.portfolioService.getAll()
        .subscribe(result => {
            result.data.forEach(function(value, key){
                if(value.media.length === 0){
                    //...
                }
            });
            this.portfolio = result.data;
        }, error => this.error + " Ouuuups une erreur est survenue sur le serveur, veuillé réessayer plus tard");
    }

    private onRemovePortfolio(id: number){
        this.portfolioService.destroyPortfolio(id)
        .subscribe(result => {
            console.log(result);
            // changement de la vue DOM
            document.getElementById("my_portfolio_"+id).remove();

            this.iziToast.warning({ 
                position: 'bottomRight',
                progressBarColor: '',
                backgroundColor: '',
                messageSize: '',
                messageColor: '',
                icon: '',
                image: '',
                imageWidth: 50,
                balloon: true,
                drag: true,
                progressBar: true,
                timeout: 5000,
                title: 'Opération terminer,',
                message: 'Votre Projet à bien été supprimé! '
            });

        }, error => this.error + " Ouuuups une erreur est survenue sur le serveur, veuillé réessayer plus tard");
    }

}