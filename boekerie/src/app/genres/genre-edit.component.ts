import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { IGenre } from '../shared/index';
import { GenresService } from '../shared/genres.service';
import { ILink } from "app/shared/links.model";

@Component({
  selector: 'app-genre-edit',
  templateUrl: './genre-edit.component.html',
  styleUrls: ['./genre-edit.component.css']
})
export class GenreEditComponent implements OnInit {
  genre: IGenre;
  hasDeleteMethod = false;
  links: ILink[] = [];
  constructor(private genresService: GenresService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.genre = this.route.snapshot.data['genredetails'];
    this.links = this.genre.links;
    console.log('hasDeleteMethod: ', this.hasDeleteMethod);
    console.log('links: ', this.links);
    console.log('genreLinks: ', this.genre.links)
    this.links.forEach(l => (l.method === 'DELETE' ?
     this.hasDeleteMethod = true : this.hasDeleteMethod = false)
      && console.log(l.method, this.hasDeleteMethod));
  }
  deleteGenre() {
      this.genresService.deleteItem(this.genre).subscribe(r => this.router.navigate(['/']));
    }

   updateGenre() {
    this.genresService.updateItem(this.genre, this.genre.id).subscribe(r => this.router.navigate([`/genres`]));
  }

}
