import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Ng2IzitoastService } from 'ng2-izitoast';
import { AppComponent } from '../../app.component';
import { NgForOf } from '@angular/common';
import { CreatePortfolioService } from './createPortfolio.service';

@Component({
    selector: 'portfolio',
    templateUrl: './createPortfolio.component.html',
    styleUrls: ['./createPortfolio.component.css']
})
export class CreatePortfolioComponent implements OnInit {
    private user: string;
    private error: string;
    private portfolio: Object;
    private uploadPortfolio: Object;
    private user_id: number;
    public auto_increment: number;
    private filename: File;
    private filename2: File;
    private filename3: File;

    constructor(appComponent: AppComponent, private router: Router, private route: ActivatedRoute, public iziToast: Ng2IzitoastService, private createPortfolioService: CreatePortfolioService) {
        this.user = appComponent.mysession();
        this.user_id = this.user['id'];
        this.auto_increment = this.getLastPortfolio();
    }
    
    /**
     * Implémentation de la méthod ngOnInit de OnInit interface 
     * Angular Interface
     */
    public ngOnInit(): void {
    }

    private onFileSelectedFilename(event): void {
        this.filename = <File>event.target.files[0];
        console.log(this.filename);
    }
    private onFileSelectedFilename2(event): void {
        this.filename2 = <File>event.target.files[0];
        console.log(this.filename2);
    }
    private onFileSelectedFilename3(event): void {
        this.filename3 = <File>event.target.files[0];
        console.log(this.filename3);
    }
  
    private onUpload(): void {
      //let id = this.route.snapshot.params['id'];
      const fd = new FormData();
      fd.append('filename', this.filename, this.filename.name)
      fd.append('filename2', this.filename2, this.filename2.name)
      fd.append('filename3', this.filename3, this.filename3.name)

      if(this.auto_increment != null){
        this.createPortfolioService.uploadPortfolio(this.auto_increment, fd)
        .subscribe(result => {
          console.log(result);
        }, error => this.error + " Ouuuups une erreur est survenue sur le serveur, veuillé réessayer plus tard");   
      } else {
        this.iziToast.error({ 
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
            title: 'Erreur,',
            message: 'Erreur ID portfolio est NULL! '
        });
      }
    }

    private getLastPortfolio(): any {
        this.createPortfolioService.getLastPortfolio()
            .subscribe(result => {
                this.auto_increment = result.data.Auto_increment;
            }, error => this.error + ' Ouuuups, une erreur est survenue sur le serveur, veuillé réessayer plus tard!');
        return this.auto_increment;
    }

    private onSubmit(user_id: number, titre: string, description: Text, role: Text, client: Text, date_debut: Date, date_fin: Date): void {
        // Create
        let portfolio = 
        { 
            user_id: user_id,
            titre: titre, 
            description: description, 
            role: role, 
            client: client, 
            date_debut: date_debut, 
            date_fin: date_fin,
        }
        this.createPortfolioService.createPortfolio(portfolio)
          .subscribe(result => {
            // Call Upload Method
            if(this.filename != undefined || this.filename2 != undefined || this.filename3 != undefined){
                this.getLastPortfolio();
                this.onUpload();
            }
            this.router.navigate(['portfolios']);
            this.iziToast.success({ 
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
                title: 'Félicitation,',
                message: 'Votre Projet à bien été enregistrer '
            });
          }, error => this.error + " Ouuuups une erreur est survenue sur le serveur, veuillé réessayer plus tard");
      }
}