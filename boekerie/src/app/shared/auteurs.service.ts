import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/RX';
import { Router } from '@angular/router';

import { BaseService } from './base.service';

import { IAuteur, IResult, ILink } from './index';

@Injectable()
export class AuteursService extends BaseService<IAuteur> {
  static serviceUrl = 'http://apis.dirkandries.be/api/auteurs';
  constructor(private http: Http, private router: Router) {
    super(router, http, AuteursService.serviceUrl);
  }
  getAuteurs(): Observable<IResult<IAuteur>> {
    return this.getList().map((result: IResult<IAuteur>) => {
      result.value = result.value.filter(g => g.naam !== null);
      return result;
    });
  }

}
