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

  constructor(private bookService: BookService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.forEach((data) => {
      this.books.push(data['books']);
    });
    console.log (this.books);
    console.log (this.books[0].cover);

    //this.books = this.route.snapshot.data['books']; // dit deel werkt voor eigen mocked data
  }

}
