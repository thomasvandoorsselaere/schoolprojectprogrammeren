import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IBook, IGenre, IAuteur } from '../shared/index';
import { BookService } from '../shared/books.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  books: IBook[];

  constructor(private bookService: BookService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.books = this.route.snapshot.data['books'];
  }
}
