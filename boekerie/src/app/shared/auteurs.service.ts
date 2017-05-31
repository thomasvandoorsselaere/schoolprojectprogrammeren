import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/RX';

import { IAuteur } from './auteur.model';

@Injectable()
export class AuteursService {
  url = 'http://apis.dirkandries.be/api/auteurs';

  constructor(private http: Http) { }
  getAuteurs(): Observable<IAuteur[]> {
    return this.http.get(this.url).map((response: Response) => {
      return <IAuteur[]>response.json().value;
    }).catch(this.handleError);
  }
   private handleError(error: Response) {
      return Observable.throw(error.statusText);
    }
   // expliciete cast naar number is nodig in onderstaande find-methode. Why? Dunno, but it does not work without and it works with... ;)
  getAuteurDetails(id): Observable<IAuteur[]> {
    return this.http.get(`${this.url}/${id}`).map((response: Response) => {
      return <IAuteur[]>response.json();
    }).catch(this.handleError);
  }
}
