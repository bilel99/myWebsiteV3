export interface IUser {
    media_id: number;
    ville_id: number;
    role_id: number;
    nom: string;
    prenom: string;
    email: string;
    password: string;
    sexe: string;
    date_naissance: Date;
    mobile: number;
    forgot: string;
    created_at: DateTimeFormat;
    updated_at: DateTimeFormat;
}