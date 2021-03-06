import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Popup } from 'ng2-opd-popup';

import { IBook, IGenre, IAuteur } from '../shared/index';
import { BookService } from '../shared/books.service';

@Component({
  selector: 'app-bookdetails',
  templateUrl: './bookdetails.component.html',
  styleUrls: ['./bookdetails.component.css']
})
export class BookDetailsComponent implements OnInit {

  @ViewChild('popupdelete') popupdelete: Popup;

  book: IBook;
  hasDeleteMethod = false;
  hasPutMethod = false;
  
  constructor(private route: ActivatedRoute, private bookService: BookService, private router: Router) { }

  ngOnInit() {
     this.book = this.route.snapshot.data['bookdetails'];
     this.checkMethods();
  }

  checkMethods() {
    let i = 0;
    while (!this.hasPutMethod && i < this.book.links.length) {

      this.book.links[i].method === 'PUT' ? this.hasPutMethod = true : this.hasPutMethod = false;
      i++;
    }
    while (!this.hasDeleteMethod && i < this.book.links.length) {

      this.book.links[i].method === 'DELETE' ? this.hasDeleteMethod = true : this.hasDeleteMethod = false;
      i++;
    }
  }
  PopupVerwijderenBoek() {
    this.popupdelete.options = {
      header: 'Verwijderen',
      color: '#62A2AB',
      widthProsentage: 40,
      animationDuration: 1,
      showButtons: true,
      confirmBtnContent: 'OK',
      cancleBtnContent: 'Cancel',
      confirmBtnClass: 'btn btn-primary',
      cancleBtnClass: 'btn btn-default',
      animation: 'fadeInDown'
    };

    this.popupdelete.show(this.popupdelete.options);

  }

  VerwijderenBoek() {
    this.bookService.deleteItem(this.book).subscribe(r => this.router.navigate(['/']));
  }
}
