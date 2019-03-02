import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { IForgotStepFinal } from './IForgotStepFinal';
import { IForgot } from './IForgot';

@Injectable()
export class ForgotService {

  private baseUrl: string = 'http://localhost/myWebsiteV3Api_Laravel/public';

  constructor(private http: Http) {}

  /**
   * Forgot Method
   * @param email 
   */
  public forgot(forgot: IForgot): Observable<IForgot> {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');

      return this.http.post(`${this.baseUrl}/api/forgotPassword`, JSON.stringify(forgot), { headers: headers })
      .map(res => res.json())
      .catch(this.handleError);
  }

  /**
   * Method call webservice forgotStepFinal to POST status
   *
   * @param forgot 
   */
  public forgotStepFinal(forgotStepFinal: IForgotStepFinal): Observable<IForgotStepFinal> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.post(`${this.baseUrl}/api/forgotPasswordStep2`, JSON.stringify(forgotStepFinal), { headers: headers })
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
