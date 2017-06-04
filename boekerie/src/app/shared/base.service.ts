import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/RX';
import { Router } from '@angular/router'
import { IResult, ILink } from "app/shared";

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
    getListBase(_url: string): Observable<IResult<T>> {
    return this._http.get(_url).map((response: Response) => {
      const result = <IResult<T>>response.json();
      return <IResult<T>>response.json();
    }).catch((error) => this.handleError(error));
  }

  deleteItem(item): Observable<T> {
    const link: ILink = item.links.find(l => l.method === 'DELETE');
    if (link === undefined) {
      this.handleError(<Response>{});
      return Observable.empty();
    } else {
      return this._http.delete(link.href).catch(this.handleError);
    }
  }
}
