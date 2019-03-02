import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { IPortfolio } from './IPortfolio';
import { IUploadPortfolio } from './IUploadPortfolio';

@Injectable()
export class EditPortfolioService {

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

  public removePortfolioFilename(id: number, number_filename: number){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.delete(`${this.baseUrl}/api/remove-images-portfolio/${id}/${number_filename}`, {headers: headers})
    .map((res: Response) => {
      res.json();
    }).catch(this.handleError);
  }

  public editUploadPortfolio(id: number, number_filename: number, formdata: any){
    return this.http.post(`${this.baseUrl}/api/edit-upload-portfolio/${id}/${number_filename}`, formdata)
    .catch(this.handleError);
  }

  public editPortfolio(id: number, portfolio: IPortfolio): Observable<IPortfolio> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.put(`${this.baseUrl}/api/edit-portfolio/${id}`, JSON.stringify(portfolio), { headers: headers })
      .map((res: Response) => {
        res.json();
      }).catch(this.handleError);
  }

  /** Upload Multiple image Method */
  /*public uploadPortfolio(id: number, formdata: any) {
    return this.http.post(`${this.baseUrl}/api/uploads-portfolio/${id}`, formdata)
    .catch(this.handleError);
  }

  public getLastPortfolio(): Observable<any> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.get(`${this.baseUrl}/api/getLastPortfolio`, { headers: headers })
    .map(res => res.json())
    .catch(this.handleError);
  }*/

  /**
   * Error Handle Method
   * @param error 
   */
  private handleError(error: Response) {
      return Observable.throw(error.json() || 'servor error');
  }

}
