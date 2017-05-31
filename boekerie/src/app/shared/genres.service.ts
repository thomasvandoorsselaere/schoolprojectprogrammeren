import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/RX';

import { IGenre, IResult } from './index';

@Injectable()
export class GenresService {
  url = 'http://apis.dirkandries.be/api/genres';
  constructor(private http: Http) {
  }
  getGenres(): Observable<IResult<IGenre>> {
    return this.http.get(this.url).map((response: Response) => {
      const result: IResult<IGenre> = <IResult<IGenre>>response.json();
      // null check omwille van genre met NULL-naam
      result.value = result.value.filter(g => g.naam !== null);
      return result;
    }).catch(this.handleError);
  }
  private handleError(error: Response) {
      return Observable.throw(error.statusText);
    }
    
  getGenreDetails(id): Observable<IGenre> {
    return this.http.get(`${this.url}/${id}`).map((response: Response) => {
      return <IGenre>response.json();
    }).catch(this.handleError);
  }
}
