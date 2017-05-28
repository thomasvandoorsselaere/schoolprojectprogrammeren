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
  constructor() { }

 ngOnChanges() {
    if (this.books) {
      this.zichtbareBooks = this.books;
    }
  }
}

