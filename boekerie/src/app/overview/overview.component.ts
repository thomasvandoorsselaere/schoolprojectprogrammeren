import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IBook, IGenre, IAuteur } from '../shared/index';
import { BookService } from '../shared/books.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  books: IBook[] = [];
  filterBy = 'all';
  sortBy = 'titel';
  sortMethod = 'up';

  constructor(private bookService: BookService, private route: ActivatedRoute) { }

  ngOnInit() {
    /*this.bookService.getBooks().subscribe((data) => { this.books = data; });*/

    this.books = this.route.snapshot.data['books']; // dit deel werkt voor eigen mocked data
  }

  sort(sortBy) {
    this.sortBy = sortBy;
    this.bookService.sort(this.books, this.sortBy, this.sortMethod);
    this.toggleSortMethod();
  }
    toggleSortMethod() {
      if (this.sortMethod === 'up') {
        this.sortMethod = 'down';
      } else {
        this.sortMethod = 'up';
      }
    }
  }
