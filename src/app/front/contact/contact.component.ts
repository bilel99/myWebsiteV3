import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ContactService } from './contact.service';
import { Ng2IzitoastService } from 'ng2-izitoast';

@Component({
    selector: 'contact-form-create',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

    private email: string;
    private sujet: string;
    private text: string;
    private error: string;

    /**
     * Constructor for class ListPokemonComponent
     * Injection du service PokemonService
     */ 
    public constructor(private router: Router, private contactService: ContactService, public iziToast: Ng2IzitoastService) {}

    /**
     * Implémentation de la méthod ngOnInit de OnInit interface 
     * Angular Interface
     */
    public ngOnInit(): void {}

    /**
     * Method Register from Component
     * 
     * @param email
     * @param sujet 
     * @param text 
     */
    private onSubmit(email, sujet, text) {
        let contact: any;
        contact = { email: email, sujet: sujet, text: text };
        
        this.contactService.addContact(contact)
            .subscribe((result => {
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
                    title: 'Félicitation,',
                    message: 'Votre demande de contact à bien été envoyé'
                });
            }), error => this.error = error.message + 'Whooops une erreur est survenue');
    }

}