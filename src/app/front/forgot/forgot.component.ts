import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { LoginService } from '../login/login.service';
import { ForgotService } from './forgot.service';
import { Ng2IzitoastService } from 'ng2-izitoast';

@Component({
    selector: 'forgot-form-create',
    templateUrl: './forgot.component.html',
    styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit {

    private email: string;
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
    private onSubmit(email: string): void {
        //e.preventDefault();
        let forgot: any;
        forgot = { email: email }

        this.forgotService.forgot(forgot)
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
                        title: 'Ouuuups,',
                        message: 'Email inconnue!'
                    });
                } else {
                    this.router.navigate(['/forgot-step-final']);
                    this.iziToast.info({ 
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
                        title: 'Hé,',
                        message: 'Vous allez recevoir un email contenant votre mot de passe provisoir'
                    });
                }
            }, error => this.error = error.message + ' Ouuuups, Error server!');
    }

}