import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IBook, IGenre, IAuteur } from '../shared/index';
import { BookService } from '../shared/books.service';

@Component({
  selector: 'app-bookdetails',
  templateUrl: './bookdetails.component.html',
  styleUrls: ['./bookdetails.component.css']
})
export class BookDetailsComponent implements OnInit {

   book: IBook;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
     this.book = this.route.snapshot.data['bookdetails'];
  }
}
