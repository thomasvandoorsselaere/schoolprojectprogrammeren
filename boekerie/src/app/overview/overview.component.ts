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
  selectedAuteur: IAuteur = undefined;
  selectedGenre: IGenre = undefined;
  selectedTitel: IBook = undefined;

  constructor(
    private bookService: BookService,
    private auteursService: AuteursService,
    private genresService: GenresService,
    private route: ActivatedRoute
    ) { }

  ngOnInit() {
    this.bookService.getBooks().subscribe((data) => { this.allBooks = data.value; });
    this.bookService.getBooks().subscribe((data) => { this.books = data.value; });
    this.auteursService.getAuteurs().subscribe(data => this.auteurs = data.value);
    this.genresService.getGenres().subscribe(data =>  this.genres = data.value );
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
     if (auteur === undefined && genre === undefined && titel === undefined) {
       this.bookService.getBooks().subscribe((data) => { this.books = data.value; });
     } else {
       this.bookService.getFilteredBooks(auteur, genre, titel).subscribe((data) => {
         this.books = data.value;
        });
     }
  }
  filterReset() {
    this.selectedAuteur = undefined;
    this.selectedGenre = undefined;
    this.selectedTitel = undefined;
    this.bookService.getBooks().subscribe((data) => { this.books = data.value; });
  }
    toggleSortMethod() {
      if (this.sortMethod === 'up') {
        this.sortMethod = 'down';
      } else {
        this.sortMethod = 'up';
      }
    }
  }



