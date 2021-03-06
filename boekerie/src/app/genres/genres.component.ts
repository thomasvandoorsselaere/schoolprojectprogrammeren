import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IGenre } from '../shared/genre.model';
import { GenresService } from 'app/shared/genres.service';


@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.css']
})
export class GenresComponent implements OnInit {
  genres: IGenre[] = [];

  constructor(private genresService: GenresService ) { }

  ngOnInit() {
    this.genresService.getGenres().subscribe((data) => {this.genres = data.value; });
  }

}
