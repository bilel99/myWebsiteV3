import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { RegisterService } from './register.service';
import { Ng2IzitoastService } from 'ng2-izitoast';

@Component({
    selector: 'register-form-create',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

    private nom: string;
    private prenom: string;
    private email: string;
    private password: string;

    private error: string;

    /**
     * Constructor for class ListPokemonComponent
     * Injection du service PokemonService
     */ 
    public constructor(private router: Router, private registerService: RegisterService, public iziToast: Ng2IzitoastService) {}

    /**
     * Implémentation de la méthod ngOnInit de OnInit interface 
     * Angular Interface
     */
    public ngOnInit(): void {}

    /**
     * Method Register from Component
     * 
     * @param nom 
     * @param prenom 
     * @param email 
     * @param password 
     */
    private onRegister(nom: string, prenom: string, email: string, password: string): void {
        let register: any;
        register = { nom: nom, prenom: prenom, email: email, password: password };

        this.registerService.register(register)
            .subscribe(result => {
                console.log(result.status);
                if(result.status === 300){
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
                        title: 'Ouuuups,',
                        message: 'Votre compte existe déjà!'
                    });
                } else {
                    this.router.navigate(['/login']);
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
                        message: 'Votre compte à bien été créer '
                    });
                }
            }, error => this.error = error.message + ' Ouuuups une erreur est survenue sur le serveur, veuillé réessayer plus tard');
    }

}