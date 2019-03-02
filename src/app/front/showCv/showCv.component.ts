import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Ng2IzitoastService } from 'ng2-izitoast';
import { ShowCvService } from './showCv.service';
import { AppComponent } from '../../app.component';

@Component({
    selector: 'showCv',
    templateUrl: './showCv.component.html',
    styleUrls: ['./showCv.component.css']
})
export class ShowCvComponent implements OnInit {
    public user: any;
    public error: string;
    public cv: any;
    public lengthCv: number;
    public groupCompetence: any;

    constructor(appComponent: AppComponent, public router: Router, public route: ActivatedRoute, public iziToast: Ng2IzitoastService, public cvService: ShowCvService) {
        this.user = appComponent.mysession();
    }
    
    /**
     * Implémentation de la méthod ngOnInit de OnInit interface 
     * Angular Interface
     */
    public ngOnInit(): void {
        // Call Method Get My CV
        let user_id = this.user.id;
        this.getMyCv(user_id);
    }

    public getGroupCompetence(competenceGroupId: Array<number>): void {
        this.cvService.getMyGroupCompetence(competenceGroupId)
            .subscribe(result => {
                this.groupCompetence = result.data;
            }, error => this.error + "Ouuups, une erreur est survenue sur le serveur, veuillé réessayer plus tard");
    }

    public getMyCv(user_id: number): void {
        let valueCompetenceGroupId: Array<number>;
        this.cvService.getMyCv(user_id)
            .subscribe(result => {
                this.cv = result.data;
                this.lengthCv = result.data.length;
                result.data[0].competence.forEach(function(value){
                    valueCompetenceGroupId = value.competenceGroup_id;
                });
                this.getGroupCompetence(valueCompetenceGroupId);
                // Create Local Storage
                localStorage.setItem('currentCv', JSON.stringify({ myCv: result.data }));
                return this.cv;
            }, error => this.error + " Ouuuups une erreur est survenue sur le serveur, veuillé réessayer plus tard");
    }

    /**
     * Wait (ms)
     * 
     * @param ms 
     */
    async delay(ms: number) {
        await new Promise(resolve => setTimeout(() => resolve(), ms)).then(() => console.log("fired"));
    }

}