import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/RX';
import { Router } from '@angular/router';

import { BaseService } from './base.service';
import { IBook, IResult } from './index';

@Injectable()
export class BookService extends BaseService<IBook> {
  static serviceUrl = 'http://apis.dirkandries.be/api/boeken';
  params = new URLSearchParams();
  constructor(private http: Http, private router: Router) {
    super(router, http, BookService.serviceUrl);
  }

  getFilteredBooks(auteur, genre, titel): Observable<IResult<IBook>> {
    if (auteur) {
      this.params.set('auteur', auteur);
    } else {
      this.params.delete('auteur');
    }
    if (genre) {
      this.params.set('genre', genre);
    } else {
      this.params.delete('genre');
    }
    if (titel) {
      this.params.set('titel', titel);
    } else {
      this.params.delete('titel');
    }
    return this.getFilteredItems(this.params);
  }

  sorteerOpTitelDesc(b1: IBook, b2: IBook) {
      if (b1.titel > b2.titel) {
        return 1;
      } else if (b1.titel === b2.titel) {
        return 0;
      } else {
        return -1;
      };
  }

  sorteerOpAuteurDesc(b1: IBook, b2: IBook) {
        if (b1.auteur.naam > b2.auteur.naam) {
        return 1;
      } else if (b1.auteur.naam === b2.auteur.naam) {
        return 0;
      } else {
        return -1;
      };
  }
  sorteerOpTitelAsc(b1: IBook, b2: IBook) {
      if (b1.titel < b2.titel) {
        return 1;
      } else if (b1.titel === b2.titel) {
        return 0;
      } else {
        return -1;
      };
  }

  sorteerOpAuteurAsc(b1: IBook, b2: IBook) {
        if (b1.auteur.naam < b2.auteur.naam) {
        return 1;
      } else if (b1.auteur.naam === b2.auteur.naam) {
        return 0;
      } else {
        return -1;
      };
  }
  sort(books, sortBy, sortMethod) {
    if (sortBy === 'titel') {
      if (sortMethod === 'up') {
        books.sort(this.sorteerOpTitelAsc);
      } else {
        books.sort(this.sorteerOpTitelDesc);
      }
    } else {
      if (sortMethod === 'up') {
        books.sort(this.sorteerOpAuteurAsc);
      } else {
        books.sort(this.sorteerOpAuteurDesc);
      }
    }
  }

  toUpper(w: string) {
    return w.toUpperCase();
  }

  getTagList(): Observable<string[]> {
    let books;
        let tags: string[] = [];
    return this.getList().map((data) => {
      books = data.value;
      books.forEach(b =>
        tags = tags.concat(b.tags));
      return this.removeDuplicates(tags.map(t => this.toUpper(t)));
    })
  }
  removeDuplicates(tags: string[]){
    const newTags: string[] = [];
    for (const tag in tags) {
      if (newTags.indexOf(tags[tag]) === -1){
        newTags.push(tags[tag].toUpperCase())
      }
    }
    return newTags.sort();
  }
}
