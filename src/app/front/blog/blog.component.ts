import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Ng2IzitoastService } from 'ng2-izitoast';
import { AppComponent } from '../../app.component';
import { BlogService } from './blog.service';

@Component({
    selector: 'blog',
    templateUrl: './blog.component.html',
    styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
    private user: string;
    private error: string;
    private blog: any;

    /**
     * 
     * @param appComponent 
     * @param router 
     * @param route 
     * @param blogService 
     * @param iziToast 
     */
    constructor(appComponent: AppComponent, private router: Router, private route: ActivatedRoute, public blogService: BlogService, public iziToast: Ng2IzitoastService) {
        this.user = appComponent.mysession();
    }
    
    /**
     * 
     */
    ngOnInit(): void {
        this.getAll();
    }

    private getAll(): void {
        this.blogService.getAll()
        .subscribe(result => {
            result.data.forEach(function(value, key){
                if(value.media.length === 0){
                    //...
                }
            });
            this.blog = result.data;
        }, error => this.error = "Oooups, une erreur est survenu sur le serveur, veuillé réessayé plus tard");
    }

    private onRemoveBlog(id: number){
        this.blogService.destroyBlog(id)
        .subscribe(result => {
            console.log(result);
            // Changement de la vue DOM
            document.getElementById("my_blog_"+id).remove();

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
                message: 'Votre blog à bien été supprimé! '
            });
        }, error => this.error + "Ouuups une erreur est survenu sur le serveur, veuillé réessayé plus tard!");
    }
    
}