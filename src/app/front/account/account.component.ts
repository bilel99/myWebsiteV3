import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';
import { Router, ActivatedRoute } from '@angular/router';
import { Ng2IzitoastService } from 'ng2-izitoast';
import { AccountService } from './account.service';
import { URLSearchParams } from '@angular/http';
import { Http, Response, Headers } from '@angular/http';
import { IUploadAvatar } from './IUploadAvatar';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  private user: any;
  private villeLibelle: string;
  private villeId: number;
  private codePostal: number;
  private error: string;

  private nom: string;
  private prenom: string;
  private sexe: string;
  private date_naissance: Date;
  private mobile: number;
  private ville_id: number;
  private media_id: number;
  private filename: File;
  private avatar: string;
 
  private baseUrl: string = 'http://localhost/myWebsiteV3Api_Laravel/public';

  constructor(appComponent: AppComponent, private router: Router, private route: ActivatedRoute, private accountService: AccountService, public iziToast: Ng2IzitoastService, private _http: Http) {
    this.user = appComponent.mysession();
    // Récupération d'un paramètre d'une route (.../:id) => this.route.snapshot.params['id']
    this.nom = this.user.nom;
    this.prenom = this.user.prenom;
    this.sexe = this.user.sexe;
    if(this.user.date_naissance != null && this.user.date_naissance != undefined){
        this.date_naissance = this.user.date_naissance.substring(0, 10);
    }
    this.mobile = this.user.mobile;
    this.villeId = this.user.ville_id;
    
    this.avatar = null;
    // Get Avatar
    this.getAvatar(this.route.snapshot.params['id']);

    // Récupération de la ville par id ville (session)
    this.getVilleIdFromCp(this.user.ville_id);
  }

  ngOnInit() {}

  private getVilleFromCp(cp: number): void {
    this.accountService.getCp(cp)
    .subscribe(result => {
      this.villeLibelle = result.ville.libelle;
      this.villeId = result.ville.id;
    }, error => this.error + " Ouuuups une erreur est survenue sur le serveur, veuillé réessayer plus tard");
  }

  private getVilleIdFromCp(id: number): void {
    this.accountService.getVilleIdFromCp(id)
    .subscribe(result => {
        this.villeLibelle = result.ville.libelle;
        this.codePostal = result.ville.cp;
    }, error => this.error + " Ouuuups une erreur est survenue sur le serveur, veuillé réessayer plus tard");
  }

  private getAvatar(id: number): void {
    this.accountService.getAvatar(id)
      .subscribe(result => {
        this.avatar = result.data['filename'];
      });
  }

  private onFileSelected(event): void {
      this.filename = <File>event.target.files[0];
  }

  private onUpload(): void {
    const fd = new FormData();
    fd.append('filename', this.filename, this.filename.name)
    let id = this.route.snapshot.params['id'];
    this.accountService.uploadAvatar(id, fd)
    .subscribe(result => {
      console.log(result);
    }, error => this.error + " Ouuuups une erreur est survenue sur le serveur, veuillé réessayer plus tard");
  }

  private onSubmit(nom: string, prenom: string, sexe: string, date_naissance: Date, mobile: number, ville_id: number, media_id: number, data: string): void {
    // Call Upload Method
    if(this.filename != undefined){
      this.onUpload();
    }
    // Update Account
    let account = 
    { 
      nom: nom, 
      prenom: prenom, 
      sexe: sexe, 
      date_naissance: date_naissance, 
      mobile: mobile, 
      ville_id: this.villeId == null ? this.user.ville_id : this.villeId,
      media_id: media_id,
      data: data
    }
    let id = this.route.snapshot.params['id'];
    this.accountService.updateProfil(id, account)
      .subscribe(result => {
        console.log(result);
        localStorage.setItem('currentUser', JSON.stringify({ user: result }));
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
            message: 'Votre profil à bien été mis à jour '
        });
      }, error => this.error + " Ouuuups une erreur est survenue sur le serveur, veuillé réessayer plus tard");
  }

}
