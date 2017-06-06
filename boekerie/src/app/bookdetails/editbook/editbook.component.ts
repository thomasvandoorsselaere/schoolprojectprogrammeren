import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { IBook,IGenre, IAuteur } from "app/shared/index";
import { BookService } from "app/shared/books.service";

@Component({
  selector: 'app-editbook',
  templateUrl: './editbook.component.html',
  styleUrls: ['./editbook.component.css']
})
export class EditbookComponent implements OnInit {

 book: IBook;

  constructor(private route: ActivatedRoute, private bookService: BookService, private router: Router) { }

  ngOnInit() {
     this.book = this.route.snapshot.data['bookdetails'];
  }
  updateBoek(){
    this.bookService.updateItem(this.book, this.book.isbn).subscribe(r => this.router.navigate(['/']));
  }
}
