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
  constructor(private genresService: GenresService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.genre = this.route.snapshot.data['genredetails'];
    console.log(this.genre);
  }

}
