import { Injectable } from '@angular/core';
import { GenresService } from '../shared/genres.service';

@Injectable()
export class GenresResolver {

  constructor(private genresService: GenresService) { }
  resolve() {
    return this.genresService.getGenres();
  }
}
