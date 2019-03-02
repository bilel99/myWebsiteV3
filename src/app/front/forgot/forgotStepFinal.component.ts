import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { LoginService } from '../login/login.service';
import { ForgotService } from './forgot.service';
import { Ng2IzitoastService } from 'ng2-izitoast';

@Component({
    selector: 'forgot-step-final-form-create',
    templateUrl: './forgotStepFinal.component.html',
    styleUrls: ['./forgotStepFinal.component.css']
})
export class ForgotStepFinalComponent implements OnInit {

    private email: string;
    private forgot: string;
    private password: string;
    private error: string;

    /**
     * Constructor for class ListPokemonComponent
     * Injection du service PokemonService
     */ 
    public constructor(private router: Router, private forgotService: ForgotService, private loginService: LoginService, public iziToast: Ng2IzitoastService) {}

    /**
     * Implémentation de la méthod ngOnInit de OnInit interface 
     * Angular Interface
     */
    public ngOnInit(): void {
        this.loginService.logout();
    }

    /**
     * Login Method
     * @param e 
     */
    private onSubmit(email: string, forgot: string, password: string): void {
        let forgotStepFinal: any;
        forgotStepFinal = { email: email, forgot: forgot, password: password };

        this.forgotService.forgotStepFinal(forgotStepFinal)
            .subscribe(result => {
                if(result.status == 300){
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
                        title: 'Ouuups',
                        message: 'Erreur sur la vérification du mot de passe!'
                    });
                } else {
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
                        message: 'Votre mot de passe à bien était modifié, vous pouvez le modifier à tout moment sur votre compte'
                    });
                }                         
            }, error => this.error = error.message + ' Ouuuups, votre mot de passe est incorrect ! ');
    }

}