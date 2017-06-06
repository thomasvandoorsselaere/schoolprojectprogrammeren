import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IBook, IGenre, IAuteur } from '../shared/index';
import { AuteursService } from '../shared/auteurs.service';
import { GenresService } from '../shared/genres.service';
import { BookService } from 'app/shared/books.service';
import { BaseService } from 'app/shared/base.service';
import { Http } from '@angular/http';
import { Router } from '@angular/router';

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

  selectedAuteur: IAuteur = undefined;
  selectedGenre: IGenre = undefined;

  constructor(
    private auteursService: AuteursService,
    private genresService: GenresService, private http: Http, private router: Router
    ) {
      super(router, http, CreateComponent.serviceUrl);
     }

  ngOnInit() {
    this.availableTags = this.getTagList();
     /*getAuteurs i.p.v. getList => dit omwille van null-check die niet aanwezig is op getList*/
    this.auteursService.getAuteurs().subscribe(data => this.auteurs = data.value);
    this.genresService.getGenres().subscribe(data =>  this.genres = data.value );
    // this.alltags = ...
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

  saveBook() {
    this.book.tags = this.selectedTags;
    console.log(this.book);
    return this.postItem(this.book).subscribe();
  }
}
