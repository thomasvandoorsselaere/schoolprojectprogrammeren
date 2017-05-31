import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IGenre } from '../shared/index';
import { GenresService } from '../shared/genres.service';

@Component({
  selector: 'app-genre-edit',
  templateUrl: './genre-edit.component.html',
  styleUrls: ['./genre-edit.component.css']
})
export class GenreEditComponent implements OnInit {
  genre: IGenre;
  hasDeleteMethod: boolean;
  constructor(private genresService: GenresService, private route: ActivatedRoute) { }

  ngOnInit() {
    let i = 0;
    this.genre = this.route.snapshot.data['genredetails'];
    // indien manier om simpelweg te breaken in lambda "this.genre.links.forEach" => toepassen! Echter nog niet gevonden/mogelijk :(
    while (!this.hasDeleteMethod && i < this.genre.links.length) {
      this.genre.links.forEach(l => l.method !== 'DELETE' ? this.hasDeleteMethod = false : this.hasDeleteMethod = true);
      i++;
    };
  }
}
