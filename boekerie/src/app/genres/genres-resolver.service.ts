import { Injectable } from '@angular/core';
import { GenresService } from '../shared/genres.service';

@Injectable()
export class GenresResolver {

  constructor(private genresService: GenresService) { }
  resolve() {
    /*getAuteurs i.p.v. getList => dit omwille van null-check die niet aanwezig is op getList*/
    return this.genresService.getGenres();
  }
}
