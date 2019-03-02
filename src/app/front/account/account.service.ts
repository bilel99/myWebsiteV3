import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { IAccount } from './IAccount';
import { IUploadAvatar } from './IUploadAvatar';

@Injectable()
export class AccountService {

  public user: string;
  private baseUrl: string = 'http://localhost/myWebsiteV3Api_Laravel/public';

  constructor(private http: Http) {
  }
  
  /**
   * updateProfil Method send Api /api/update-profil/{id} from PUT Status
   * @param updateProfil 
   */
  public updateProfil(id: number, account: IAccount): Observable<IAccount> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.put(`${this.baseUrl}/api/update-account/${id}`, JSON.stringify(account), 
    { headers: headers })
      .map(res => res.json())
      .catch(this.handleError);
  }

  /** Upload Single Avatar Method */
  public uploadAvatar(id: number, formdata: any) {
    return this.http.post(`${this.baseUrl}/api/upload-avatar/${id}`, formdata)
    .catch(this.handleError);
  }

  /** Get CP from edit ville_id */
  public getCp(cp: number): Observable<any> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.get(`${this.baseUrl}/api/getVille/${cp}`, { headers: headers })
    .map(res => res.json())
    .catch(this.handleError);
  }

  /** Return avatar data for user Id param */
  public getAvatar(id: number): Observable<any> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.get(`${this.baseUrl}/api/getAvatar/${id}`, { headers: headers })
    .map(res => res.json())
    .catch(this.handleError);
  }

  /** Get CP Ville from Id */
  public getVilleIdFromCp(id: number): Observable<any> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.get(`${this.baseUrl}/api/getVilleIdFromCp/${id}`, { headers: headers })
    .map(res => res.json())
    .catch(this.handleError);
  }
  
  /**
   * Error Handle Method
   * @param error 
   */
  private handleError(error: Response) {
      return Observable.throw(error.json() || 'servor error');
  }

}
