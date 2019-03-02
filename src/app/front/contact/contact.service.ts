import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { IContact } from './IContact';

@Injectable()
export class ContactService {

  private baseUrl: string = 'http://localhost/myWebsiteV3Api_Laravel/public';

  constructor(private http: Http) {}
  
  /**
   * add contact Method send Api /api/add-contact from POST Status
   * @param contact 
   */
  public addContact(contact: IContact): Observable<IContact> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.post(`${this.baseUrl}/api/contact`, JSON.stringify(contact), { headers: headers })
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
