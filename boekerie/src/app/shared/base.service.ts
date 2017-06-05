import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/RX';
import { Router } from '@angular/router';
import { IResult, ILink } from 'app/shared';

export class BaseService<T> {

    constructor(private _router: Router, private _http: Http, private _url: string) {

    }
    public handleError(error: Response) {
      console.log('error:', error);
      console.log('router', this._router);
      this._router.navigate(['/auch', error.status]);
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
    console.log(item);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    this._http.post(this._url, JSON.stringify(item), options).map((response: Response) => {
      console.log(response);
      return response.json();
    }).catch((error) => this.handleError(error)).subscribe();
    return null;
  }

  toUpper(w: string) {
    return w.toUpperCase();
  }
  getTagList() {
    let waarden = ['Test1', 'Test2', 'Test3', 'Test4'];
    return waarden.map(w => this.toUpper(w));
  }

}
