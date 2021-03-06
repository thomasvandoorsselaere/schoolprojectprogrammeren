import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { BookService } from './shared/books.service';

@Injectable()
export class BooksResolver implements Resolve<any> {
  constructor(private bookService: BookService ) { }

  resolve() {
    return this.bookService.getList();
  }
}

