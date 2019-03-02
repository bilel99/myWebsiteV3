import { Component } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Ng2IzitoastService } from 'ng2-izitoast';
import { LoginService } from './front/login/login.service';
import { IUser } from './front/register/IUser';
import { JsonPipe } from '../../node_modules/@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: []
})
export class AppComponent {
  public user: string;

  constructor(private route: ActivatedRoute, private router: Router, private loginService: LoginService, public iziToast: Ng2IzitoastService) {
    this.user = this.mysession();
  }

  public mysession(): string {
    // traitement du local storage pour récupération de la session de l'utilisateur
    let userFormatJson = localStorage.getItem('currentUser');
    //console.log(userFormatJson);
    //console.log(JSON.parse(userFormatJson));
    if(userFormatJson != null || userFormatJson != undefined){
      let parseUser = JSON.parse(userFormatJson).user;
      //console.log(parseUser);
      this.user = parseUser.data[0];
      console.log(this.user); /**TODO => Retirer cette ligne avant la mise en production */
      return this.user;
    }
  }

  private logout(): void {
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
        title: 'Hé, ',
        message: 'Vous êtes à present déconnecté '
    });   
    this.loginService.logout();
  }

}