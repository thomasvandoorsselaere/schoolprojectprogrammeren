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
    return this.getListBase(this.url).map((result: IResult<IAuteur>) => {
      result.value = result.value.filter(g => g.naam !== null);
      return result;
    });
  }

  getDetails(id: number): Observable<IAuteur> {
    return this.getDetailsBase(this.url, id);
  }

  deleteAuteur(auteur: IAuteur): Observable<IAuteur> {
    return this.deleteItem (auteur);
  }
}
