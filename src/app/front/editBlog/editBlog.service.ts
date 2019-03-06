import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { IBlog } from './IBlog';

@Injectable()
export class EditBlogService {
    private baseUrl: string = 'http://localhost/myWebsiteV3Api_Laravel/public';
    
    constructor(private http: Http) {}

    /**
     * 
     * @param id 
     */
    public get(id: number): Observable<any>{
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this.http.get(`${this.baseUrl}/api/blog/${id}`, { headers: headers })
        .map(res => res.json())
        .catch(this.handleError);
    }

    /**
     * 
     * @param id 
     * @param number_filename 
     */
    public removeBlogFilename(id: number, number_filename: number){
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this.http.delete(`${this.baseUrl}/api/remove-images-blog/${id}/${number_filename}`,{ headers: headers })
        .map((res: Response) => {
            res.json();
        }).catch(this.handleError);
    }

    /**
     * 
     * @param id 
     * @param number_filename 
     * @param formdata 
     */
    public editUploadBlog(id: number, number_filename: number, formdata: any){
        return this.http.post(`${this.baseUrl}/api/edit-upload-blog/${id}/${number_filename}`, formdata)
        .catch(this.handleError);
    }

    /**
     * 
     * @param id 
     * @param blog 
     */
    public editBlog(id: number, blog: IBlog): Observable<IBlog> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this.http.put(`${this.baseUrl}/api/edit-blog/${id}`, JSON.stringify(blog), { headers: headers })
        .map((res: Response) => {
            res.json();
        }).catch(this.handleError);
    }

    /**
     * Error Handle Method
     * @param error 
     */
    private handleError(error: Response) {
        return Observable.throw(error.json() || 'servor error');
    }
}