import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class ShowPortfolioService {

  private baseUrl: string =
  'http://localhost/myWebsiteV3Api_Laravel/public';

  constructor(private http: Http) {}
  
  public get(id: number): Observable<any>{
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.get(`${this.baseUrl}/api/portfolios/${id}`, { headers: headers })
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
