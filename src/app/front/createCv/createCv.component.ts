import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Ng2IzitoastService } from 'ng2-izitoast';
import { AppComponent } from '../../app.component';
import { CreateCvService } from './createCv.service';

@Component({
    selector: 'createCv',
    templateUrl: './createCv.component.html',
    styleUrls: ['./createCv.component.css']
})
export class CreateCvComponent implements OnInit {
    private user: any;
    private error: string;
    
    constructor(appComponent: AppComponent, private router: Router, private route: ActivatedRoute, public iziToast: Ng2IzitoastService, public createCvService: CreateCvService) {
        this.user = appComponent.mysession();
    }
    
    /**
     * Implémentation de la méthod ngOnInit de OnInit interface 
     * Angular Interface
     */
    public ngOnInit(): void {
        
    }

}