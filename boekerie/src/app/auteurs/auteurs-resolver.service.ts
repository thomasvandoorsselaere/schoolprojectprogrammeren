import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { AuteursService } from '../shared/auteurs.service';

@Injectable()
export class AuteursResolver implements Resolve<any> {
  constructor(private auteursService: AuteursService) { }

  resolve(route: ActivatedRouteSnapshot) {
  /*getAuteurs i.p.v. getList => dit omwille van null-check die niet aanwezig is op getList*/
   return this.auteursService.getAuteurs();
  }
}

