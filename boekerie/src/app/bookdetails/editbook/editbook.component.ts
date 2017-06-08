import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { IBook, IGenre, IAuteur } from 'app/shared/index';
import { BookService } from 'app/shared/books.service';
import { Popup } from 'ng2-opd-popup';
import { GenresService } from 'app/shared/genres.service';
import { AuteursService } from 'app/shared/auteurs.service';

@Component({
  selector: 'app-editbook',
  templateUrl: './editbook.component.html',
  styleUrls: ['./editbook.component.css']
})
export class EditbookComponent implements OnInit {

  book: IBook;
  selectedTags: string[]= [];
  availableTags: string[]= [];
  newTagModel = null;
  auteurs: IAuteur[] = [];
  genres: IGenre[] = [];
  auteur: IAuteur = <IAuteur>{};
  genre: IGenre = <IGenre>{};

  @ViewChild('popupAddAuteur') popupAddAuteur: Popup;
  @ViewChild('popupAddGenre') popupAddGenre: Popup;

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private router: Router,
    private auteursService: AuteursService,
    private genresService: GenresService
    ) { }

  ngOnInit() {
     this.book = this.route.snapshot.data['bookdetails'];
     // onderstaande manier is mogelijks niet oké bij laadtijden?
     this.selectedTags = this.book.tags;
     this.auteursService.getAuteurs().subscribe(data => this.auteurs = data.value);
     this.genresService.getGenres().subscribe(data =>  this.genres = data.value );
     this.availableTags = this.bookService.getTagList();
     console.log(this.book.auteur)
  }

  // verdere controles te voorzien zodat bestaande tags niet ontdubbeld worden
  removeTagFromSelected(tag) {
    const index = this.selectedTags.indexOf(tag);
    this.selectedTags.splice(index, 1);

    this.availableTags.push(tag);
    this.availableTags.sort();
  }

  addTagToSelected(tag: string) {
    const index = this.availableTags.indexOf(tag);

    this.availableTags.splice(index, 1);

    this.selectedTags.push(tag);
    this.selectedTags.sort();
  }

  addNewTag(tag: string) {
    if (this.availableTags.indexOf(tag.toUpperCase()) !== -1) {
      this.addTagToSelected(tag.toUpperCase());
    } else {
      this.selectedTags.push(tag.toUpperCase());
      this.selectedTags.sort();
    }
    this.newTagModel = null;

  }
  updateBoek() {
    this.book.tags = this.selectedTags;
    this.bookService.updateItem(this.book, this.book.isbn).subscribe(r => this.router.navigate([`/details/${this.book.isbn}`]));
  }

    popupAuteurToevoegen() {
    this.popupAddAuteur.options = {
      header: 'Auteur toevoegen',
      color: '#62A2AB',
      widthProsentage: 40,
      animationDuration: 1,
      showButtons: true,
      confirmBtnContent: 'OK',
      cancleBtnContent: 'Cancel',
      confirmBtnClass: 'btn btn-primary',
      cancleBtnClass: 'btn btn-default',
      animation: 'fadeInDown'
    };
    this.popupAddAuteur.show(this.popupAddAuteur.options);
  }

  addAuteur(auteur) {
    console.log('this.book.auteur: ', this.book.auteur);
    console.log('auteur: ', auteur);
    for ( const auteurElement in this.auteurs ) {
      if (this.auteurs[auteurElement].naam === auteur.naam) {
        this.book.auteur = this.auteurs[auteurElement];
        break;
      } else {
        if (+auteurElement === (this.auteurs.length - 1)) {
          console.log(this.auteurs.length - 1 );
          this.auteursService.postItem(auteur).subscribe(r =>
          this.auteursService.getAuteurs().subscribe(
            data => (this.auteurs = data.value) && (this.book.auteur = this.auteurs[auteurElement + 1])
            )
          );
        }
      }
    }
    this.popupAddAuteur.hide();
  }
  popupGenreToevoegen() {
    this.popupAddGenre.options = {
      header: 'Genre toevoegen',
      color: '#62A2AB',
      widthProsentage: 40,
      animationDuration: 1,
      showButtons: true,
      confirmBtnContent: 'OK',
      cancleBtnContent: 'Cancel',
      confirmBtnClass: 'btn btn-primary',
      cancleBtnClass: 'btn btn-default',
      animation: 'fadeInDown'
    };
    this.popupAddGenre.show(this.popupAddGenre.options);
  }

  addGenre(genre) {
    console.log('this.book.genre: ', this.book.genre);
    console.log('genre: ', genre);
    // tslint:disable-next-line:max-line-length
    for ( const genreElement in this.genre ) {
      if (this.genre[genreElement].naam === genre.naam) {
        this.book.genre = this.genres[genreElement];
        break;
      } else {
        if (+genreElement === (this.genres.length - 1)) {
          console.log(this.genres.length - 1 );
          this.genresService.postItem(genre).subscribe(r =>
          this.genresService.getGenres().subscribe(
            data => (this.genres = data.value) && (this.book.genre = this.genres[genreElement + 1])
            )
          );
        }
      }
    }
    this.popupAddGenre.hide();
  }
}
