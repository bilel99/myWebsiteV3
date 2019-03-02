import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class BlogService {
    private baseUrl: string = 'http://localhost/myWebsiteV3Api_Laravel/public';

    /**
     * 
     * @param http 
     */
    constructor(private http: Http){}

    /**
     * Pattern Observable
     * return all field
     */
    public getAll(): Observable<any>{
        let headers = new Headers;
        headers.append('Content-Type', 'application/json');
        return this.http.get(`${this.baseUrl}/api/blog`, { headers: headers })
        .map(res => res.json())
        .catch(this.handleError);
    }

    public destroyBlog(id: number){
        let headers = new Headers;
        headers.append('Content-Type', 'application/json');
        return this.http.delete(`${this.baseUrl}/api/delete-blog/${id}`)
        .map((res: Response) => {
            res.json();
        }).catch(this.handleError);
    }

    /**
     * 
     * @param error 
     */
    private handleError(error: Response){
        return Observable.throw(error.json() || 'server error');
    }
}