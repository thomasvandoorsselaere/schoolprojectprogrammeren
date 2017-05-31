import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { GenresService } from '../shared/genres.service';
import {IGenre} from '../shared/index';

@Injectable()
export class GenreDetailsResolver implements Resolve<IGenre> {

  constructor(private genresService: GenresService) { }

  resolve(route: ActivatedRouteSnapshot) {
    return this.genresService.getGenreDetails(route.params['id']);
  }
}
