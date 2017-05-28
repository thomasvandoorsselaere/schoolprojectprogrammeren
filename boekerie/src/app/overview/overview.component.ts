import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IBook, IGenre, IAuteur } from '../shared/index';
import { BookService } from '../shared/books.service';
import { AuteursService } from '../shared/auteurs.service';
import { GenresService } from '../shared/genres.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  books: IBook[] = [];
  allBooks: IBook[] = [];
  auteurs: IAuteur[] = [];
  genres: IGenre[] = [];
  sortBy = 'titel';
  sortMethod = 'up';
  selectedAuteur: IAuteur;
  selectedGenre: IGenre;
  selectedTitel: IBook;

  constructor(
    private bookService: BookService,
    private auteursService: AuteursService,
    private genresService: GenresService,
    private route: ActivatedRoute
    ) { }

  ngOnInit() {
    this.bookService.getBooks().subscribe((data) => { this.allBooks = data; });
    this.bookService.getBooks().subscribe((data) => { this.books = data; });
    this.auteursService.getAuteurs().subscribe((data) => { this.auteurs = data; });
    this.genresService.getGenres().subscribe((data) => { this.genres = data; });
    // need some mocking?
    /*this.books = this.route.snapshot.data['books'];
    this.books.forEach(b => this.auteurs.push(b.auteur));
    this.books.forEach(b => this.genres.push(b.genre)); */
  }

  sort(sortBy) {
    this.sortBy = sortBy;
    this.bookService.sort(this.books, this.sortBy, this.sortMethod);
    this.toggleSortMethod();
  }
  filter() {
     const auteur = this.selectedAuteur ? this.selectedAuteur.naam : undefined;
     const genre = this.selectedGenre ? this.selectedGenre.naam : undefined;
     const titel = this.selectedTitel ? this.selectedTitel.titel : undefined;
     if (auteur === undefined && genre === undefined && titel === undefined){
       this.bookService.getBooks().subscribe((data) => { this.books = data; });
     } else {
       this.bookService.getFilteredBooks(auteur, genre, titel).subscribe((data) => { this.books = data; });
     }
  }
    toggleSortMethod() {
      if (this.sortMethod === 'up') {
        this.sortMethod = 'down';
      } else {
        this.sortMethod = 'up';
      }
    }
  }
