import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { IGenre } from '../shared/index';
import { GenresService } from '../shared/genres.service';
import { ILink } from 'app/shared/links.model';

@Component({
  selector: 'app-genre-edit',
  templateUrl: './genre-edit.component.html',
  styleUrls: ['./genre-edit.component.css']
})
export class GenreEditComponent implements OnInit {
  genre: IGenre;
  hasDeleteMethod = false;
  hasPutMethod = false;
  constructor(private genresService: GenresService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.genre = this.route.snapshot.data['genredetails'];
    this.checkMethods();
  }

  checkMethods() {
    let i = 0;
    while (!this.hasPutMethod && i < this.genre.links.length) {

      this.genre.links[i].method === 'PUT' ? this.hasPutMethod = true : this.hasPutMethod = false;
      i++;
    }
    while (!this.hasDeleteMethod && i < this.genre.links.length) {

      this.genre.links[i].method === 'DELETE' ? this.hasDeleteMethod = true : this.hasDeleteMethod = false;
      i++;
    }
  }

  deleteGenre() {
      this.genresService.deleteItem(this.genre).subscribe(r => this.router.navigate(['/']));
    }

   updateGenre() {
    this.genresService.updateItem(this.genre, this.genre.id).subscribe(r => this.router.navigate([`/genres`]));
  }

}
