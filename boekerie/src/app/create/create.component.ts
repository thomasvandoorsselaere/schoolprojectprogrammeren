import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IBook, IGenre, IAuteur } from '../shared/index';
import { AuteursService } from '../shared/auteurs.service';
import { GenresService } from '../shared/genres.service';
import { BookService } from 'app/shared/books.service';
import { BaseService } from 'app/shared/base.service';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { Popup } from 'ng2-opd-popup';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent extends BaseService<IBook> implements OnInit {

  static serviceUrl = 'http://apis.dirkandries.be/api/boeken';
  auteurs: IAuteur[] = [];
  genres: IGenre[] = [];
  selectedTags: string[]= [];
  availableTags: string[]= [];
  newTagModel = null;
  book: IBook = <IBook>{};
  auteur: IAuteur = <IAuteur>{};
  genre: IGenre = <IGenre>{};
  selectedAuteur: IAuteur = undefined;
  selectedGenre: IGenre = undefined;

  @ViewChild('popupAddAuteur') popupAddAuteur: Popup;
  @ViewChild('popupAddGenre') popupAddGenre: Popup;

  constructor(
    private auteursService: AuteursService,
    private genresService: GenresService,
    private http: Http,
    private router: Router
    ) {
      super(router, http, CreateComponent.serviceUrl);
     }

  ngOnInit() {
    this.availableTags = this.getTagList();
     /*getAuteurs i.p.v. getList => dit omwille van null-check die niet aanwezig is op getList*/
    this.auteursService.getAuteurs().subscribe(data => this.auteurs = data.value);
    this.genresService.getGenres().subscribe(data =>  this.genres = data.value );
  }
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

  addAuteur(auteur) {
    for ( const auteurElement in this.auteurs ) {
      if (this.auteurs[auteurElement].naam === auteur.naam) {
        this.book.auteur = this.auteurs[auteurElement];
        break;
      } else {
        if (+auteurElement === (this.auteurs.length - 1)) {
          this.auteursService.postItem(auteur).subscribe(r =>
          this.auteurs.push(r) && (this.book.auteur = r)
          );
        }
      }
    }
    this.popupAddAuteur.hide();
  }


  addGenre(genre) {
    for ( const genreElement in this.genres ) {
      if (this.genres[genreElement].naam === genre.naam) {
        this.book.genre = this.genres[genreElement];
        break;
      } else {
        if (+genreElement === (this.genres.length - 1)) {
          this.genresService.postItem(genre).subscribe(r =>
            this.genres.push(r) && (this.book.genre = r)
          );
        }
      }
    }
    this.popupAddGenre.hide();
  }


  saveBook() {
    this.book.tags = this.selectedTags;
    console.log(this.book);
    return this.postItem(this.book).subscribe();
  }
}
