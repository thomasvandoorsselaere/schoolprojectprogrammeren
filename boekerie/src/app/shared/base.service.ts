import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/RX';
import { Router } from '@angular/router';
import { IResult, ILink } from 'app/shared';

export class BaseService<T> {

    constructor(private _router: Router, private _http: Http, private _url: string) {

    }
    public handleError(error: Response) {
      this._router.navigate(['/auch/' + error.status]);
      return Observable.throw(error.statusText);
    }

    getDetails(_identifier: any): Observable<T> {
    return this._http.get(`${this._url}/${_identifier}`).map((response: Response) => {
          return <T>response.json();
    }).catch((error) => this.handleError(error));
  }

   getList(): Observable<IResult<T>> {
    return this._http.get(this._url).map((response: Response) => {
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
      return this._http.delete(link.href).catch((error) => this.handleError(error));
    }
  }

  getFilteredItems(searchParams) {
        return this._http.get(this._url, {search: searchParams})
     .map((response: Response) => {
      return <IResult<T>>response.json();
    }).catch((error) => this.handleError(error));
  }

  postItem(item): Observable<T> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    return this._http.post(this._url, JSON.stringify(item), options).map((response: Response) => {
      return <T>response.json();
    }).catch((error) => this.handleError(error));
  }
  postItemNoResponse(item): Observable<T> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    return this._http.post(this._url, JSON.stringify(item), options).catch((error) => this.handleError(error));
  }


    updateItem(_item, _identifier): Observable<T> {
      const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    return this._http.put(`${this._url}/${_identifier}`, JSON.stringify(_item), options).catch((error) => this.handleError(error));
  }

}
