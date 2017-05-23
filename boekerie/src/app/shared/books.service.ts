import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/RX';

import { IBook } from './books.model';

@Injectable()
export class BookService {
  books: IBook[] = BOOKS;
  url: string = 'http://apis.dirkandries.be/api';
  constructor(private http: Http) {
  }
/*  getBooks(): Observable<IBook[]> {
    return this.http.get(url+'/books').map((response: Response) => {
      return <IBook[]>response.json();
    }).catch(this.handleError);
  }*/
  getBooks() {
    return this.books;
  }

  getDetails(isbn){
    return this.getBooks().find(i => i.isbn === isbn);
  }
 /* private handleError(error: Response) {
      return Observable.throw(error.statusText);
    }*/
}


const BOOKS: IBook[] = [
  {
    isbn: '978-0-00-744803-6',
    titel: 'A Song Of Ice And Fire: A Game Of Thrones',
    genre: {
      id: 1,
      naam: 'Roman'
    },
    auteur: {
        id: 1,
        naam: 'George R. R. Martin'
    },
    cover: 'http://www.isfdb.org/wiki/images/d/d2/GMFTHRNSDD0000.jpg',
    uitgegeven: 1996,
    prijs: 24.99,
    tags: ['Oorlog', 'Complot', 'Tieten', 'Fantasy', 'Ridders, jonkvrouwen en draken'],
    sterren: 5
  },
  {
    isbn: '90-245-5705-4',
    titel: 'The Da Vinci Code',
    genre: {
      id: 2,
      naam: 'Fictie'
    },
    auteur: {
        id: 2,
        naam: 'Dan Brown'
    },
    cover: 'https://s.s-bol.com/imgbase0/imagebase3/large/FC/6/8/8/1/1001004002781886.jpg',
    uitgegeven: 2004,
    prijs: 15.99,
    tags: ['Religie', 'Complot', 'Thriller', 'Misdaad', 'Tempeliers', 'Mysterie'],
    sterren: 4
  },
  {
    isbn: '978-90-257-4377-2',
    titel: 'Trekking in Zweden',
    genre: {
      id: 3,
      naam: 'Documentaire'
    },
    auteur: {
        id: 3,
        naam: 'Sander Van Der Werf'
    },
    cover: 'https://s.s-bol.com/imgbase0/imagebase3/large/FC/5/6/0/1/1001004006421065.jpg',
    uitgegeven: 2009,
    prijs: 21.50,
    tags: ['Trekken', 'Camperen', 'Zweden', 'Survival'],
    sterren: 5
  }
];
