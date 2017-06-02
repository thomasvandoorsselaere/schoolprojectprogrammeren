import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/RX';
import { BaseService } from './base.service';

import { IGenre, IResult, ILink } from './index';

@Injectable()
export class GenresService extends BaseService<IGenre> {
  url = 'http://apis.dirkandries.be/api/genres';
  constructor(private http: Http, private _router: Router) {
    super(_router);
  }
  getGenres(): Observable<IResult<IGenre>> {
    return this.http.get(this.url).map((response: Response) => {
      const result: IResult<IGenre> = <IResult<IGenre>>response.json();
      // null check omwille van genre met NULL-naam
      result.value = result.value.filter(g => g.naam !== null);
      return result;
    }).catch((error) => this.handleError(error));
  }

  getGenreDetails(id): Observable<IGenre> {
    return this.http.get(`${this.url}/${id}`).map((response: Response) => {
      return <IGenre>response.json();
    }).catch((error) => this.handleError(error));
  }

  deleteGenre(genre: IGenre) {
    const link: ILink = genre.links.find(l => l.method === 'DELETE');
    if (link === undefined) {
      this.handleError(<Response>{});
      return Observable.empty();
    } else {
      return this.http.delete(link.href).catch(this.handleError);
    }
  }
}
