import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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
  constructor(private auteursService: AuteursService, private route: ActivatedRoute) { }

  ngOnInit() {
    let i = 0;
    this.auteur = this.route.snapshot.data['auteurdetails'];
    // indien manier om simpelweg te breaken in lambda "this.genre.links.forEach" => toepassen! Echter nog niet gevonden/mogelijk :(
    while (!this.hasDeleteMethod && i < this.auteur.links.length) {
      this.auteur.links.forEach(l => l.method !== 'DELETE' ? this.hasDeleteMethod = false : this.hasDeleteMethod = true);
      i++;
    };
  }
}
