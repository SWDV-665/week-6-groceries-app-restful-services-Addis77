import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs';
import {map, catchError} from 'rxjs/operators';
import {Subject} from 'rxjs';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroceriesService {
  items:any[] = [];
  dataChanged$: Observable<boolean>;
  private dataChangeSubject: Subject<boolean>;
  baseURL = "http://localhost:8080";

  constructor(public http: HttpClient) { 
    this.dataChangeSubject = new Subject<boolean>();
    this.dataChanged$ = this.dataChangeSubject.asObservable();
  }
  
    //getItems(){
    //  return this.items;
    //}
  
    getItems():Observable<object[]>{
      return <Observable<object[]>> this.http.get(this.baseURL + '/api/groceries').pipe(
        map(this.extractData),
        catchError(this.handleError)
      );
    }
  
    private extractData(res: any){
      let body = res;
      return body || {};
    }
  
    private handleError(error: Response | any){
      let errMsg: string;
      if(error instanceof Response){
        const err = error || '';
        errMsg = err.toString() ? error.status + " - " + error.statusText : err.toString();
      }
      else{
        errMsg = error.message ? error.message : error.toString();
      }
      console.error(errMsg);
      return throwError(errMsg);
    }
  
    removeItem(index:any){
      this.http.delete(this.baseURL + "/api/groceries/" + index).subscribe((res:any) => {
        this.items = res;
        this.dataChangeSubject.next(true);
      });
    }
    
    addItem(item:any){
      this.http.post(this.baseURL + "/api/groceries", item).subscribe((res:any) => {
        this.items = res;
        this.dataChangeSubject.next(true);
      });
    }
  
    editItem(item:any, index:any, id:any){
      this.http.put(this.baseURL + "/api/groceries/" + id, item).subscribe((res:any) => {
        this.items = res;
        this.dataChangeSubject.next(true);
      });
    }
}