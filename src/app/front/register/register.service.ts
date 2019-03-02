import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { IRegister } from './IRegister';

@Injectable()
export class RegisterService {

  private baseUrl: string =
  'http://localhost/myWebsiteV3Api_Laravel/public';

  constructor(private http: Http) {}
  
  /**
   * Register Method send Api /api/register from POST Status
   * @param register 
   */
  public register(register: IRegister): Observable<IRegister> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.post(`${this.baseUrl}/api/register`, JSON.stringify(register), { headers: headers })
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
