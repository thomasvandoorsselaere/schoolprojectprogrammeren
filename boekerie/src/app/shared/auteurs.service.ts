import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/RX';
import { Router } from '@angular/router';

import { BaseService } from './base.service';

import { IAuteur, IResult, ILink } from './index';

@Injectable()
export class AuteursService extends BaseService<IAuteur> {
  url = 'http://apis.dirkandries.be/api/auteurs';
  constructor(private http: Http, private router: Router) {
    super(router, http);
  }
  getAuteurs(): Observable<IResult<IAuteur>> {
    return this.http.get(this.url).map((response: Response) => {
      // null check omwille van genre met NULL-naam
      const result: IResult<IAuteur> = <IResult<IAuteur>>response.json();
      result.value = result.value.filter(a => a.naam !== null);
      return result;
    }).catch((error) => this.handleError(error));
  }

  getDetails(id: number): Observable<IAuteur> {
    return this.getDetailsBase(this.url, id);
  }
  
  deleteAuteur(auteur: IAuteur) {
    const link: ILink = auteur.links.find(l => l.method === 'DELETE');
    if (link === undefined) {
      this.handleError(<Response>{});
      return Observable.empty();
    } else {
      return this.http.delete(link.href).catch(this.handleError);
    }
  }
}
