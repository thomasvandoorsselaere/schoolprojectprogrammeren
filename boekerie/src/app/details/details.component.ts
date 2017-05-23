import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IBook, IGenre, IAuteur } from '../shared/index';
import { BookService } from '../shared/books.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

   book: IBook;
   isbn: string;

  constructor(private bookService: BookService, private route: ActivatedRoute) { }

  ngOnInit() {

     this.book = this.route.snapshot.data['details'];
  }



}
