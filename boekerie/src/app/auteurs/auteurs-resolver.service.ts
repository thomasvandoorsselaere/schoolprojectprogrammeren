import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { AuteursService } from '../shared/auteurs.service';

@Injectable()
export class AuteursResolver implements Resolve<any> {
  constructor(private auteursService: AuteursService) { }

  resolve(route: ActivatedRouteSnapshot) {
   return this.auteursService.getAuteurs();
  }
}

