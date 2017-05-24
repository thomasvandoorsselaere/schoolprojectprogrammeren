import { Component, OnChanges, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IBook, IGenre, IAuteur } from '../shared/index';
import { BookService } from '../shared/books.service';

@Component({
  selector: 'app-overview-list',
  templateUrl: './overview-list.component.html',
  styleUrls: ['./overview-list.component.css']
})
export class OverviewListComponent implements OnChanges, Input {
  zichtbareBooks: IBook[] = [];
  @Input() books: IBook[];
  @Input() filterBy = 'all';
  @Input() sortBy = 'titel';
  constructor() { }

 ngOnChanges() {
    if (this.books) {
      this.zichtbareBooks = this.books;
      // this.filterSessions(this.filterBy);
      this.sortBy === 'titel' ? this.zichtbareBooks.sort(sorteerOpTitelAsc) : this.zichtbareBooks.sort(sorteerOpAuteurAsc);
    }
  }

/*  filterSessions(filter) {
          if (filter === 'all'){
              this.zichtbareBooks = this.books.slice(0);
          } else {
              this.zichtbareBooks = this.books.filter(book => {
                  return book.titel.toLocaleLowerCase() === filter;
              });
          }
      }*/
  }


function sorteerOpTitelAsc(b1: IBook, b2: IBook) {
    if (b1.titel > b2.titel) {
      return 1;
    } else if (b1.titel === b2.titel) {
      return 0;
    } else {
      return -1;
    };
}

function sorteerOpAuteurAsc(b1: IBook, b2: IBook) {
      if (b1.auteur.naam > b2.auteur.naam) {
      return 1;
    } else if (b1.auteur.naam === b2.auteur.naam) {
      return 0;
    } else {
      return -1;
    };
}
