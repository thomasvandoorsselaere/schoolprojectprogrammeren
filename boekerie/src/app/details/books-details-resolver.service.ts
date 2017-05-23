import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { BookService } from "app/shared/books.service";



@Injectable()
export class DetailsResolver implements Resolve<any> {
  constructor(private bookService: BookService ) { }

  resolve(route:ActivatedRouteSnapshot) {
   return this.bookService.getDetails(route.params['isbn'])
  }


}

