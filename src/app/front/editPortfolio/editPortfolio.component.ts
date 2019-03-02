import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Ng2IzitoastService } from 'ng2-izitoast';
import { AppComponent } from '../../app.component';
import { NgForOf } from '@angular/common';
import { EditPortfolioService } from './editPortfolio.service';

@Component({
    selector: 'portfolio',
    templateUrl: './editPortfolio.component.html',
    styleUrls: ['./editPortfolio.component.css']
})
export class EditPortfolioComponent implements OnInit {
    /* Propriétés objectKey permet de pouvoir voir la clé d'un objet avec une boucle *ngFor par exemple: *ngFor: let key of objectKey(row.media) ensuite dans key on aura la clé de l'objet */
    objectKeys = Object.keys;

    private user: string;
    private error: string;
    private portfolio: any;
    private uploadPortfolio: Object;
    public auto_increment: number;
    
    private user_id: number;
    private titre: string;
    private description: string;
    private role: string;
    private client: string;
    private date_debut: Date;
    private date_fin: Date;
    private filename: File;
    private filename2: File;
    private filename3: File;

    constructor(appComponent: AppComponent, private router: Router, private route: ActivatedRoute, public iziToast: Ng2IzitoastService, private editPortfolioService: EditPortfolioService) {
        this.user = appComponent.mysession();
        this.user_id = this.user['id'];

        let id = this.route.snapshot.params['id'];
        this.get(id);
    }
    
    /**
     * Implémentation de la méthod ngOnInit de OnInit interface 
     * Angular Interface
     */
    public ngOnInit(): void {
    }

    private get(id: number): void {
        this.editPortfolioService.get(id)
        .subscribe(result => {
            this.portfolio = result.data;

            this.user_id = result.data[0]['user_id'];
            this.titre = result.data[0]['titre'];
            this.description = result.data[0]['description'];
            this.role = result.data[0]['role'];
            this.client = result.data[0]['client'];
            this.date_debut = result.data[0]['date_debut'];
            this.date_fin = result.data[0]['date_fin'];

            console.log(this.portfolio);

            /** Vérification si image src = "addProjetPortfolio" 
             * alors changer l'icone material */
            setTimeout(function(){
                for(let i = 0; i <= 2; i++){
                    let img = (<HTMLImageElement>document.getElementById("image_portfolio_"+i)).src.split('/')[7];
                    if(img === 'default_portfolio.png'){
                        // Change Material Icons
                        document.getElementById('material_icons_'+i).innerHTML = 'not_interested';
                    }
                }
            }, 10);
            
        }, error => this.error + " Ouuuups une erreur est survenue sur le serveur, veuillé réessayer plus tard");
    }

    private onRemoveFilename(id, key){
        if(key == 0){
            key = 1;
        }else if(key == 1){
            key = 2;
        }else if(key == 2){
            key = 3;
        }

        // Les liens sont différent du coup petite vérification en cas ou
        let whereImg = (<HTMLImageElement>document.getElementById("image_portfolio_"+ (<number>key-1))).src.split('/')[7];
        if(whereImg == undefined){
            whereImg = (<HTMLImageElement>document.getElementById("image_portfolio_"+(<number>key-1))).src.split('/')[6];
        }
        if(whereImg != "default_portfolio.png"){
            this.editPortfolioService.removePortfolioFilename(id, key)
                .subscribe(result => {
                    console.log(result);
                    /** Traitement JS, afin de modifier l'image provisoirement,
                     * afin que l'utilisateur puisse voir le changement sans rafraichir 
                     * son navigateur **/
                    // Chemin de l'image
                    let chemin = '../../../assets/front/img/default_portfolio.png';
                    for(let i = 0; i <= 2; i++){
                        if(key == i+1){
                            // Change Image SRC
                            (<HTMLImageElement>document.getElementById('image_portfolio_'+i)).src = chemin;
                            // Change Material Icons
                            document.getElementById('material_icons_'+i).innerHTML = 'not_interested';
                        }
                    }

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
                        message: 'Votre image à bien était supprimé! '
                    });
                }, error => this.error + " Ouuuups une erreur est survenue sur le serveur, veuillé réessayer plus tard");
        }
    }

    private onFileSelectedFilename(event): void {
        this.filename = <File>event.target.files[0];
        console.log(this.filename);
        // send method upload attached attribute
        let id = this.route.snapshot.params['id'];
        this.onEditUploadPortfolioFilename(id, 1)
        // filename (key = 1)
    }
    private onFileSelectedFilename2(event): void {
        this.filename2 = <File>event.target.files[0];
        console.log(this.filename2);
        // send method upload attached attribute
        let id = this.route.snapshot.params['id'];
        this.onEditUploadPortfolioFilename(id, 2)
        // filename2 (key = 2)
    }
    private onFileSelectedFilename3(event): void {
        this.filename3 = <File>event.target.files[0];
        console.log(this.filename3);
        // send method upload attached attribute
        let id = this.route.snapshot.params['id'];
        this.onEditUploadPortfolioFilename(id, 3)
        // filename3 (key = 3)
    }

    private onEditUploadPortfolioFilename(id, key){
        if(key === 1){
            const fd = new FormData();
            fd.append('filename', this.filename, this.filename.name);
            this.editPortfolioService.editUploadPortfolio(id, 1, fd)
            .subscribe(result => {
                console.log(result);
                /** Affichage de l'image après l'upload 
                 * + Changement de l'icone material design, 
                 * la methode get appelle les methode respective */
                this.get(id);

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
                    message: 'Votre image à bien était uploader! '
                });
              }, error => this.error + " Ouuuups une erreur est survenue sur le serveur, veuillé réessayer plus tard");
        }else if(key === 2){
            //let id = this.route.snapshot.params['id'];
            const fd = new FormData();
            fd.append('filename2', this.filename2, this.filename2.name)
            this.editPortfolioService.editUploadPortfolio(id, 2, fd)
            .subscribe(result => {
                console.log(result);
                /** Affichage de l'image après l'upload 
                 * + Changement de l'icone material design, 
                 * la methode get appelle les methode respective */
                this.get(id);

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
                    message: 'Votre image à bien était uploader! '
                });
              }, error => this.error + " Ouuuups une erreur est survenue sur le serveur, veuillé réessayer plus tard");
        }else if(key === 3){
            //let id = this.route.snapshot.params['id'];
            const fd = new FormData();
            fd.append('filename3', this.filename3, this.filename3.name)
            this.editPortfolioService.editUploadPortfolio(id, 3, fd)
            .subscribe(result => {
                console.log(result);
                /** Affichage de l'image après l'upload 
                 * + Changement de l'icone material design, 
                 * la methode get appelle les methode respective */
                this.get(id);
                
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
                    message: 'Votre image à bien était uploader! '
                });
              }, error => this.error + " Ouuuups une erreur est survenue sur le serveur, veuillé réessayer plus tard");
        }
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
        let id = this.route.snapshot.params['id'];
        this.editPortfolioService.editPortfolio(id, portfolio)
          .subscribe(result => {
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
                message: 'Votre Projet à bien été modifié '
            });
          }, error => this.error + " Ouuuups une erreur est survenue sur le serveur, veuillé réessayer plus tard");
      }
}