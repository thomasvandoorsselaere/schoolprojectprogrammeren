import { Component, OnInit } from '@angular/core';
import { IBook, IGenre, IAuteur } from '../shared/index'
import { AuteursService } from '../shared/auteurs.service'
import { GenresService } from '../shared/genres.service'

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  
  auteurs: IAuteur[] = [];
  genres: IGenre[] = [];

  selectedAuteur: IAuteur = undefined;
  selectedGenre: IGenre = undefined;

  constructor( 
    private auteursService: AuteursService,
    private genresService: GenresService
    ) { }

  ngOnInit() {
    this.auteursService.getAuteurs().subscribe(data => this.auteurs = data.value);
    this.genresService.getGenres().subscribe(data =>  this.genres = data.value );
  }

}
