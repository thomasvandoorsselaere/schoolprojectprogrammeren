import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { IAuteur } from '../shared/index';
import { AuteursService } from '../shared/auteurs.service';

@Component({
  selector: 'app-auteur-edit',
  templateUrl: './auteur-edit.component.html',
  styleUrls: ['./auteur-edit.component.css']
})
export class AuteurDetailsComponent implements OnInit {
  auteur: IAuteur;
  hasDeleteMethod = false;
  hasPutMethod = false;
  constructor(private auteursService: AuteursService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {

    this.auteur = this.route.snapshot.data['auteurdetails'];
    this.checkMethods();
  }

  checkMethods() {
    let i = 0;
    while (!this.hasPutMethod && i < this.auteur.links.length) {

      this.auteur.links[i].method === 'PUT' ? this.hasPutMethod = true : this.hasPutMethod = false;
      i++;
    }
    while (!this.hasDeleteMethod && i < this.auteur.links.length) {

      this.auteur.links[i].method === 'DELETE' ? this.hasDeleteMethod = true : this.hasDeleteMethod = false;
      i++;
    }
  }

  deleteAuteur() {
      this.auteursService.deleteItem(this.auteur).subscribe(r => this.router.navigate(['/auteurs']));
    }

   updateAuteur() {
    this.auteursService.updateItem(this.auteur, this.auteur.id).subscribe(r => this.router.navigate([`/auteurs`]));
  }
}
