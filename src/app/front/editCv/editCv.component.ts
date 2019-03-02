import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Ng2IzitoastService } from 'ng2-izitoast';
import { EditCvService } from './editCv.service';
import { AppComponent } from '../../app.component';
import { FormBuilder, FormGroup, FormArray, Validators, Form } from '@angular/forms';
import { ShowCvComponent } from '../showCv/showCv.component';
import { ShowCvService } from '../showCv/showCv.service';

@Component({
    selector: 'editCv',
    templateUrl: './editCv.component.html',
    styleUrls: ['./editCv.component.css']
})
export class EditCvComponent implements OnInit {
    /** TODO ###################IMPORTANT################################ 
     * Attention ici formBuilder de Angular me crée un retour json tableau de tableau
     * donc on a par example :
     * [
     * {
     * "cv_name":"toto",
     * "cv_image":"filename.png",
     * "cv_email":"email@gmail.com",
     * etc...,
     * formation[
     * "formation_name":"formation1",
     * "formation_ecole":"ecole1",
     * etc...,
     * ],
     * experience[
     * "experience_name":"experience",
     * "experience_langage":"language1",
     * etc...,
     * ],
     * loisir[
     * "loisir":"loisir1"
     * ],
     * etc...,
     * }
     * ];
     * 
     * modifier mon webservice pour recevoir un JSON du même type voir commentaire todo
     * en haut du fichier CvController.php du webservice important
     * Faire la même chose pour la création d'un CV tout comme l'édition d'un CV
     * A TRAVAILLER
     */
    // TODO #####################IMPORTANT###############################

    public cvForm: FormGroup;
    public user: any;
    public user_id: number;
    public error: string;
    public cv: any;
    public myLocalStorageCurrentCv: any;
    // En construction
    private buildPage: Boolean;
    
    constructor(appComponent: AppComponent, public router: Router, public route: ActivatedRoute, public iziToast: Ng2IzitoastService, public editCvService: EditCvService, public formBuilder: FormBuilder) {
        this.user = appComponent.mysession();
        this.user_id = this.user.id;

        // En construction
        this.buildPage = true;
    }
    
    /**
     * Implémentation de la méthod ngOnInit de OnInit interface 
     * Angular Interface
     */
    public ngOnInit(): void {
        this.cv = this.getMyCv(this.user_id);
        this.initForm();

        
        /*this.delay(800).then(any => {
            this.getDataCv();
            //console.log(this.cv);
            //console.log(this.cv.adresse);
        });*/
    }

    public getMyCv(user_id: number): any {
        this.editCvService.getMyCv(user_id)
            .subscribe(result => {
                this.cv = result.data[0];
                return this.cv;
            }, error => this.error + " Ouuuups une erreur est survenue sur le serveur, veuillé réessayer plus tard");
    }

    public initForm(){
        this.getDataCv();
        this.cvForm = this.formBuilder.group({
            cv_user_id: this.user['id'],
            cv_adresse: this.myLocalStorageCurrentCv[0].adresse,
            cv_ville: this.myLocalStorageCurrentCv[0].ville,
            cv_situation: this.myLocalStorageCurrentCv[0].situation,
            cv_nationalite: this.myLocalStorageCurrentCv[0].nationalite,
            cv_permis: this.myLocalStorageCurrentCv[0].permis,
            cv_titre: this.myLocalStorageCurrentCv[0].titre,
            cv_description: this.myLocalStorageCurrentCv[0].description,
            cv_mobile: this.myLocalStorageCurrentCv[0].mobile,
            cv_email: this.myLocalStorageCurrentCv[0].email,
            
            formation_titre: this.formBuilder.array([]),
            formation_date_debut: this.formBuilder.array([]),
            formation_date_fin: this.formBuilder.array([]),
            formation_sujet: this.formBuilder.array([]),
            formation_ecole: this.formBuilder.array([]),

            competence_competenceGroup_id: this.formBuilder.array([]),
            competence_savoir: this.formBuilder.array([]),
            competence_niveau: this.formBuilder.array([]),

            experience_titre: this.formBuilder.array([]),
            experience_date_debut: this.formBuilder.array([]),
            experience_date_fin: this.formBuilder.array([]),
            experience_sujet: this.formBuilder.array([]),
            experience_description: this.formBuilder.array([]),
            experience_contrat: this.formBuilder.array([]),

            competenceLinguistique_langue: this.formBuilder.array([]),
            competenceLinguistique_niveau: this.formBuilder.array([]),

            loisir_loisir: this.formBuilder.array([])
        });
    }
    
    /**
     * ################ DEBUT FORMATION ANGULAR FORM BUILDER ######################
     */
    public getFormation_titre(): FormArray {
        return this.cvForm.get('formation_titre') as FormArray;
    }
    public onAddFormation_titre(){
        const newElementControl = this.formBuilder.control(null, Validators.required);
        this.getFormation_titre().push(newElementControl);
    }
    public getFormation_date_debut(): FormArray {
        return this.cvForm.get('formation_date_debut') as FormArray;
    }
    public onAddFormation_date_debut(){
        const newElementControl = this.formBuilder.control(null, Validators.required);
        this.getFormation_date_debut().push(newElementControl);
    }
    public getFormation_date_fin(): FormArray {
        return this.cvForm.get('formation_date_fin') as FormArray;
    }
    public onAddFormation_date_fin(){
        const newElementControl = this.formBuilder.control(null, Validators.required);
        this.getFormation_date_fin().push(newElementControl);
    }
    public getFormation_sujet(): FormArray {
        return this.cvForm.get('formation_sujet') as FormArray;
    }
    public onAddFormation_sujet(){
        const newElementControl = this.formBuilder.control(null, Validators.required);
        this.getFormation_sujet().push(newElementControl);
    }
    public getFormation_ecole(): FormArray {
        return this.cvForm.get('formation_ecole') as FormArray;
    }
    public onAddFormation_ecole(){
        const newElementControl = this.formBuilder.control(null, Validators.required);
        this.getFormation_ecole().push(newElementControl);
    }
    /**
     * ################ DEBUT COMPETENCE ANGULAR FORM BUILDER ######################
     */
    public getCompetence_Group_id(): FormArray {
        return this.cvForm.get('competence_competenceGroup_id') as FormArray;
    }
    public onAddCompetence_group_id(){
        const newElementControl = this.formBuilder.control(null, Validators.required);
        this.getCompetence_Group_id().push(newElementControl);
    }
    public getCompetence_savoir(): FormArray {
        return this.cvForm.get('competence_savoir') as FormArray;
    }
    public onAddCompetence_savoir(){
        const newElementControl = this.formBuilder.control(null, Validators.required);
        this.getCompetence_savoir().push(newElementControl);
    }
    public getCompetence_niveau(): FormArray {
        return this.cvForm.get('competence_niveau') as FormArray;
    }
    public onAddCompetence_niveau(){
        const newElementControl = this.formBuilder.control(null, Validators.required);
        this.getCompetence_niveau().push(newElementControl);
    }
    /**
     * ################ DEBUT EXPERIENCE ANGULAR FORM BUILDER ######################
     */
    public getExperience_titre(): FormArray {
        return this.cvForm.get('experience_titre') as FormArray;
    }
    public onAddExperience_titre(){
        const newElementControl = this.formBuilder.control(null, Validators.required);
        this.getExperience_titre().push(newElementControl);
    }
    public getExperience_date_debut(): FormArray {
        return this.cvForm.get('experience_date_debut') as FormArray;
    }
    public onAddExperience_date_debut(){
        const newElementControl = this.formBuilder.control(null, Validators.required);
        this.getExperience_date_debut().push(newElementControl);
    }
    public getExperience_date_fin(): FormArray {
        return this.cvForm.get('experience_date_fin') as FormArray;
    }
    public onAddExperience_date_fin(){
        const newElementControl = this.formBuilder.control(null, Validators.required);
        this.getExperience_date_fin().push(newElementControl);
    }
    public getExperience_sujet(): FormArray {
        return this.cvForm.get('experience_sujet') as FormArray;
    }
    public onAddExperience_sujet(){
        const newElementControl = this.formBuilder.control(null, Validators.required);
        this.getExperience_sujet().push(newElementControl);
    }
    public getExperience_description(): FormArray {
        return this.cvForm.get('experience_description') as FormArray;
    }
    public onAddExperience_description(){
        const newElementControl = this.formBuilder.control(null, Validators.required);
        this.getExperience_description().push(newElementControl);
    }
    public getExperience_contrat(): FormArray {
        return this.cvForm.get('experience_contrat') as FormArray;
    }
    public onAddExperience_contrat(){
        const newElementControl = this.formBuilder.control(null, Validators.required);
        this.getExperience_contrat().push(newElementControl);
    }

    /**
     * ################ DEBUT COMPETENCE LINGUISTIQUE ANGULAR FORM BUILDER #######
     */
    public getCompetenceLinguistique_langue(): FormArray {
        return this.cvForm.get('competenceLinguistique_langue') as FormArray;
    }
    public onAddCompetenceLinguistique_langue(){
        const newElementControl = this.formBuilder.control(null, Validators.required);
        this.getCompetenceLinguistique_langue().push(newElementControl);
    }
    public getCompetenceLinguistique_niveau(): FormArray {
        return this.cvForm.get('competenceLinguistique_niveau') as FormArray;
    }
    public onAddCompetenceLinguistique_niveau(){
        const newElementControl = this.formBuilder.control(null, Validators.required);
        this.getCompetenceLinguistique_niveau().push(newElementControl);
    }

    /**
     * ################ DEBUT LOISIR ANGULAR FORM BUILDER #######
     */
    public getLoisir(): FormArray {
        return this.cvForm.get('loisir_loisir') as FormArray;
    }
    public onAddLoisir(){
        const newElementControl = this.formBuilder.control(null, Validators.required);
        this.getLoisir().push(newElementControl);
    }

    /**
     * 
     * @param value
     */
    public onSubmit(value){
        console.log(value);
        //const formValue = this.cvForm.value;
        //console.log(JSON.stringify(formValue));

    }

    /**
     * Receive Data Session for CV
     */
    public getDataCv(): any {
        let getMyCv = localStorage.getItem('currentCv');
        if(getMyCv != null || getMyCv != undefined){
            this.myLocalStorageCurrentCv = JSON.parse(getMyCv).myCv;
            console.log(this.myLocalStorageCurrentCv);
            return this.myLocalStorageCurrentCv;
        }
    }

    /**
     * Wait function (ms)
     * 
     * @param ms 
     */
    async delay(ms: number) {
        await new Promise(resolve => setTimeout(() => resolve(), ms)).then(() => console.log("fired"));
    }
}