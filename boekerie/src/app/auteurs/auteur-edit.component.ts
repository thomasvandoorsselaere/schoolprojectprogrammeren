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
  hasDeleteMethod: boolean;
  constructor(private auteursService: AuteursService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    let i = 0;
    this.auteur = this.route.snapshot.data['auteurdetails'];
    // indien manier om simpelweg te breaken in lambda "this.auteur.links.forEach" => toepassen! Echter nog niet gevonden/mogelijk :(
    while (!this.hasDeleteMethod && i < this.auteur.links.length) {
      this.auteur.links.forEach(l => l.method === 'DELETE' ? this.hasDeleteMethod = true : this.hasDeleteMethod = false);
      i++;
    };
  }
  deleteAuteur() {
      this.auteursService.deleteItem(this.auteur).subscribe(r => this.router.navigate(['/auteurs']));
    }

   updateAuteur() {
    this.auteursService.updateItem(this.auteur, this.auteur.id).subscribe(r => this.router.navigate([`/auteurs`]));
  }
}
