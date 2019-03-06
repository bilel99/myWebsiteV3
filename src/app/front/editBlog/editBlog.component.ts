import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Ng2IzitoastService } from 'ng2-izitoast';
import { AppComponent } from '../../app.component';
import { EditBlogService } from './editBlog.service';

@Component({
    selector: 'edit-blog',
    templateUrl: './editBlog.component.html',
    styleUrls: ['./editBlog.component.css']
})
export class EditBlogComponent implements OnInit {
    /* Propriétés objectKey permet de pouvoir voir la clé d'un objet avec une boucle *ngFor par exemple: *ngFor: let key of objectKey(row.media) ensuite dans key on aura la clé de l'objet */
    objectKeys = Object.keys;
    
    private user: string;
    private error: string;
    private blog: any;
    private uploadBlog: Object;
    public auto_increment: number;
    private user_id: number;
    private titre: string;
    private introduction: string;
    private description: string;
    private filename: File;
    private filename2: File;
    private filename3: File;
    private addInputFile: number = 0;
    private add_inputFile_one: boolean = false;
    private add_inputFile_two: boolean = false;

    constructor(appComponent: AppComponent, private router: Router, private route: ActivatedRoute, public iziToast: Ng2IzitoastService, private editBlogService: EditBlogService) {
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
        this.editBlogService.get(id)
        .subscribe(result => {
            this.blog = result.data

            this.user_id = result.data[0]['user_id'];
            this.titre = result.data[0]['titre'];
            this.introduction = result.data[0]['introduction'];
            this.description = result.data[0]['description'];

            console.log(this.blog);

            /** Vérification si image src = "addBlog" 
             * alors changer l'icone material */
            setTimeout(function(){
                for(let i = 0; i <= 2; i++){
                    let img = (<HTMLImageElement>document.getElementById('image_blog_'+i)).src.split('/')[7];
                    if(img === 'default_blog.png'){
                        // Change materiel icons
                        document.getElementById('material_icons_'+i).innerHTML = 'not_interested';
                    }
                }
            }, 10);
        }, error => this.error + "Ouuups une erreur est survenu sur le serveur, veuillé réessayé plus tard !");
    }

    /**
     * Add input file HTML
     */
    private onInputFile(): void {
        if(this.addInputFile <= 2){
            console.log(this.addInputFile);
            this.addInputFile = this.addInputFile+=1;
            if(this.addInputFile == 1){
                console.log('ici 1');
                this.add_inputFile_one = true;                
            } 
            if(this.addInputFile == 2){
                console.log('ici 2');
                this.add_inputFile_two = true;

                // Remove button <dom>
                document.getElementById('button_addInputFile').remove();
            }
        }
    }

    /**
     * 
     * @param id 
     * @param key 
     */
    private onRemoveFilename(id, key){
        if(key == 0){
            key = 1;
        }else if(key == 1){
            key = 2;
        }else if(key == 2){
            key = 3;
        }

        // Les liens sont différent du coup petite vérification en cas ou
        let whereImg = (<HTMLImageElement>document.getElementById('image_blog_'+ (<number>key-1))).src.split('/')[7];
        if(whereImg == undefined){
            whereImg = (<HTMLImageElement>document.getElementById('image_blog_'+(<number>key-1))).src.split('/')[6];
        }
        if(whereImg != 'default_blog.png'){
            this.editBlogService.removeBlogFilename(id, key)
            .subscribe(result => {
                console.log(result);
                /** Traitement JS, remove bloc image html **/
                for(let i = 0; i <= 2; i++){
                    if(key == i+1){
                        // Remove bloc html
                        document.getElementById('bloc_image_'+i).remove();
                        this.get(this.route.snapshot.params['id']);
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
            this.editBlogService.editUploadBlog(id, 1, fd)
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
            this.editBlogService.editUploadBlog(id, 2, fd)
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
            this.editBlogService.editUploadBlog(id, 3, fd)
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

    private onSubmit(user_id: number, titre: string, introduction: Text, description: Text): void {
        // Create
        let blog = 
        { 
            user_id: user_id,
            titre: titre, 
            introduction: introduction,
            description: description,
        }
        let id = this.route.snapshot.params['id'];
        this.editBlogService.editBlog(id, blog)
          .subscribe(result => {
            this.router.navigate(['blog']);
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
                message: 'Votre Blog à bien été modifié '
            });
          }, error => this.error + " Ouuuups une erreur est survenue sur le serveur, veuillé réessayer plus tard");
      }
}