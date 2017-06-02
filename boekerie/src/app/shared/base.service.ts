import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/RX';
import { Router } from '@angular/router';

export class BaseService<T> {
    constructor(private router: Router) {

    }
    public handleError(error: Response) {
      console.log("error:", error);
      console.log("router", this.router);
      this.router.navigate(['/auch', error.status]);
      return Observable.throw(error.statusText);
    }
/*    getDetails(url: string, identifier: any): Observable<T> {
    return this._http.get(`${url}/${identifier}`).map((response: Response) => {
          return <IBook>response.json();
    }).catch((error) => this.handleError(error));
  }*/
}
