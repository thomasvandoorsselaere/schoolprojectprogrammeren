import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/RX';

import { BaseService } from './base.service';
import { IGenre, IResult, ILink } from './index';

@Injectable()
export class GenresService extends BaseService<IGenre> {
  static serviceUrl = 'http://apis.dirkandries.be/api/genres';
  constructor(private http: Http, private router: Router) {
    super(router, http, GenresService.serviceUrl);
  }

  getGenres(): Observable<IResult<IGenre>> {
    return this.getList().map((result: IResult<IGenre>) => {
      result.value = result.value.filter(g => g.naam !== null);
      return result;
    });
  }
}
