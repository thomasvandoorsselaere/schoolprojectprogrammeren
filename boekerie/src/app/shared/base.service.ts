import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/RX';
import { Router } from '@angular/router';

export class BaseService<T> {
    constructor(private _router: Router, private _http: Http) {

    }
    public handleError(error: Response) {
      console.log("error:", error);
      console.log("router", this._router);
      this._router.navigate(['/auch', error.status]);
      return Observable.throw(error.statusText);
    }
    getDetailsBase(_url: string, _identifier: any): Observable<T> {
    return this._http.get(`${_url}/${_identifier}`).map((response: Response) => {
          return <T>response.json();
    }).catch((error) => this.handleError(error));
  }
}
