import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/RX';
import { Router } from '@angular/router';

export class BaseService {
    constructor(private router: Router) {
    }
    public handleError(error: Response) {
    this.router.navigate(['/auch']);
      return Observable.throw(error.statusText);
    }
}
