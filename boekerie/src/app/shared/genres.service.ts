import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/RX';

import { IGenre } from './genre.model';

@Injectable()
export class GenresService {
  url = 'http://apis.dirkandries.be/api/genres';

  constructor(private http: Http) {
  }
  getGenres(): Observable<IGenre[]> {
    return this.http.get(this.url).map((response: Response) => {
      return <IGenre[]>response.json().value;
    }).catch(this.handleError);
  }
  private handleError(error: Response) {
      return Observable.throw(error.statusText);
    }
}
