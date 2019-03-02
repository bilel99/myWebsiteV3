import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
    selector: 'accueil',
    templateUrl: './accueil.component.html',
    styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {
    private title: string;

    /**
     * Constructor for class ListPokemonComponent
     * Injection du service PokemonService
     */ 
    public constructor(private router: Router) {
        this.title = "Accueil";
    }

    /**
     * Implémentation de la méthod ngOnInit de OnInit interface 
     * Angular Interface
     */
    public ngOnInit(): void {

    }

}