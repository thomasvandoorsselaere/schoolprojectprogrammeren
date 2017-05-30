import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/RX';

import { IBook } from './books.model';

@Injectable()
export class BookService {
  url = 'http://apis.dirkandries.be/api/boeken';
  books: IBook[];
  params = new URLSearchParams();
  constructor(private http: Http) {
  }
  getBooks(): Observable<IBook[]> {
    return this.http.get(this.url).map((response: Response) => {
      return <IBook[]>response.json().value;
    }).catch(this.handleError);
  }

  getDetails(isbn): Observable<IBook[]> {
      return this.http.get(`${this.url}/${isbn}`).map((response: Response) => {
      return <IBook[]>response.json();
    }).catch(this.handleError);
  }
  private handleError(error: Response) {
      return Observable.throw(error.statusText);
    }
/*  getFilteredBooks(auteur, genre, titel) {
    return this.http.get(this.url + '?auteur=${auteur}&genre=${genre}&titel=${titel}').map((response: Response) => {
      return <IBook[]>response.json().value;
    }).catch(this.handleError);;
  }
*/
  getFilteredBooks(auteur, genre, titel) {
    if (auteur) {
      this.params.set('auteur', auteur);
    }
    if (genre) {
      this.params.set('genre', genre);
    }
    if (titel) {
      this.params.set('titel', titel);
    }

    return this.http.get(this.url, {search: this.params})
     .map((response: Response) => {
      return <IBook[]>response.json().value;
    }).catch(this.handleError);
  }

  // indien mock nodig is (a.k.a. API-offline-toestanden), geeft onderstaande redding (alle bovenstaande zaken mogen in commentaar, overview.component.ts moet ook nog aangepast worden ifv mock)
  /* books: IBook[] = BOOKS;
  constructor(private http: Http) {
  }
  getBooks() {
    return this.books;
  }

  getDetails(isbn) {
    return this.getBooks().find(i => i.isbn === isbn);
  }
*/
// einde mock

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
}


//Data voor mock
const BOOKS: IBook[] = [
  {
    isbn: '9780007448036',
    titel: 'A Song Of Ice And Fire: A Game Of Thrones',
    auteur: {
        id: 1,
        naam: 'George R. R. Martin',
        links: [{
          'href': 'http://apis.dirkandries.be/api/Auteurs/1',
          'rel': 'get_auteur',
          'method': 'GET'
        }]
    },
    genre: {
      id: 1,
      naam: 'Roman',
      links: [{
        href: 'http://apis.dirkandries.be/api/Genres/1',
        rel: 'get_genre',
        method: 'GET'
      }]
    },
    uitgegeven: 1996,
    cover: 'http://www.isfdb.org/wiki/images/d/d2/GMFTHRNSDD0000.jpg',
    sterren: 5,
    tags: ['Oorlog', 'Complot', 'Tieten', 'Fantasy', 'Ridders, jonkvrouwen en draken'],
    links: [{
      href: 'books/9780007448036',
      rel: 'self',
      method: 'GET'
    },
    {
      href: 'books/9780007448036',
      rel: 'update_boek',
      method: 'PUT'
    },
    {
      href: 'books/9780007448036',
      rel: 'delete_boek',
      method: 'DELETE'
    }]
  },
  {
    isbn: '9024557054',
    titel: 'The Da Vinci Code',
    auteur: {
        id: 2,
        naam: 'Dan Brown',
        links: [{
          'href': 'http://apis.dirkandries.be/api/Auteurs/1',
          'rel': 'get_auteur',
          'method': 'GET'
        }]
    },
    genre: {
      id: 2,
      naam: 'Fictie',
      links: [{
        'href': 'http://apis.dirkandries.be/api/Genres/1',
        'rel': 'get_genre',
        'method': 'GET'
      }]
    },
    uitgegeven: 2004,
    cover: 'https://s.s-bol.com/imgbase0/imagebase3/large/FC/6/8/8/1/1001004002781886.jpg',
    sterren: 4,
    tags: ['Religie', 'Complot', 'Thriller', 'Misdaad', 'Tempeliers', 'Mysterie'],
    links: [{
      href: 'books/9024557054',
      rel: 'self',
      method: 'GET'
    },
    {
      href: 'books/9024557054',
      rel: 'update_boek',
      method: 'PUT'
    },
    {
      href: 'books/9024557054',
      rel: 'delete_boek',
      method: 'DELETE'
    }]
  },
  {
    isbn: '9789025743772',
    titel: 'Trekking in Zweden',
    auteur: {
        id: 3,
        naam: 'Sander Van Der Werf',
        links: [
          {'href': 'http://apis.dirkandries.be/api/Auteurs/1',
          'rel': 'get_auteur',
          'method': 'GET'
        }]
    },
    genre: {
      id: 3,
      naam: 'Documentaire',
      links: [{
        'href': 'http://apis.dirkandries.be/api/Genres/1',
        'rel': 'get_genre',
        'method': 'GET'
      }]
    },
    uitgegeven: 2009,
    cover: 'https://s.s-bol.com/imgbase0/imagebase3/large/FC/5/6/0/1/1001004006421065.jpg',
    sterren: 5,
    tags: ['Trekken', 'Camperen', 'Zweden', 'Survival'],
    links: [{
      href: 'books/9789025743772',
      rel: 'self',
      method: 'GET'
    },
    {
      href: 'books/9789025743772',
      rel: 'update_boek',
      method: 'PUT'
    },
    {
      href: 'books/9789025743772',
      rel: 'delete_boek',
      method: 'DELETE'
    }]
  }
];
