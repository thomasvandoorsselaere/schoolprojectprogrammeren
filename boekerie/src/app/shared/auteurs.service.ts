import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/RX';

import { IAuteur, IResult } from './index';

@Injectable()
export class AuteursService {
  url = 'http://apis.dirkandries.be/api/auteurs';

  constructor(private http: Http) { }
  getAuteurs(): Observable<IResult<IAuteur>> {
    return this.http.get(this.url).map((response: Response) => {
      // null check omwille van genre met NULL-naam
      const result: IResult<IAuteur> = <IResult<IAuteur>>response.json();
      result.value = result.value.filter(a => a.naam !== null);
      return result;
    }).catch(this.handleError);
  }
   private handleError(error: Response) {
      return Observable.throw(error.statusText);
    }

  getAuteurDetails(id): Observable<IAuteur> {
    return this.http.get(`${this.url}/${id}`).map((response: Response) => {
      return <IAuteur>response.json();
    }).catch(this.handleError);
  }
}
