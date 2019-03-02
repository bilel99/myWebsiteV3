import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { LoginService } from './login.service';
import { Ng2IzitoastService } from 'ng2-izitoast';

@Component({
    selector: 'login-form-create',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    private email: string;
    private password: string;
    private error: string;

    /**
     * Constructor for class ListPokemonComponent
     * Injection du service PokemonService
     */ 
    public constructor(private router: Router, private loginService: LoginService, public iziToast: Ng2IzitoastService) {}

    /**
     * Implémentation de la méthod ngOnInit de OnInit interface 
     * Angular Interface
     */
    public ngOnInit(): void {
        this.loginService.logout();
    }

    /**
     * Login Method
     * @param
     */
    private onLogin(email: string, password: string): void {
        //e.preventDefault();
        let login: any;
        login = { email: this.email, password: this.password }
        
        this.loginService.login(login)
            .subscribe(result => {
                if(result.status === 300) {
                    this.error = 'verify your email or password ! ';
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
                        message: 'vous avez fait une erreur sur le champ EMAIL ou PASSWORD'
                    });         
                } else {
                    // Création de la session localStorage
                    localStorage.setItem('currentUser', JSON.stringify({ user: result }));
                    this.router.navigate(['/bilel-bekkouche']);
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
                        message: 'Bienvenue sur votre compte '+this.email
                    });
                }
            }, error => this.error = error.message + ' Error server ! ');
    }

}