import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { GenresService } from '../shared/genres.service';

@Injectable()
export class GenreDetailsResolver implements Resolve<any> {

  constructor(private genresService: GenresService) { }

  resolve(route: ActivatedRouteSnapshot) {
    return this.genresService.getGenreDetails(route.params['id']);
  }
}
