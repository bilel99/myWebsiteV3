import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { ILogin } from './ILogin';

@Injectable()
export class LoginService {

  private baseUrl: string = 'http://localhost/myWebsiteV3Api_Laravel/public';

  constructor(private http: Http) {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  /**
   * Login Method
   * @param email 
   * @param password 
   */
  public login(login: ILogin): Observable<ILogin> {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');

      return this.http.post(`${this.baseUrl}/api/login`, JSON.stringify(login), { headers: headers })
      .map(res => res.json())
      .catch(this.handleError);
  }

  /** 
   * Logout Method
   */
  public logout(): void {
      //this.token = null;
      localStorage.removeItem('currentUser');
  }
  
  /**
   * Error Handle Method
   * @param error 
   */
  private handleError(error: Response) {
      return Observable.throw(error.json() || 'servor error');
  }

}
