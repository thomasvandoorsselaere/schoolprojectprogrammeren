import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { IAuteur } from '../shared/index';
import { AuteursService } from '../shared/auteurs.service';
import { ILink } from 'app/shared/links.model';

@Component({
  selector: 'app-auteur-edit',
  templateUrl: './auteur-edit.component.html',
  styleUrls: ['./auteur-edit.component.css']
})
export class AuteurDetailsComponent implements OnInit {
  auteur: IAuteur;
  links: ILink[];
  hasDeleteMethod = false;
  constructor(private auteursService: AuteursService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.auteur = this.route.snapshot.data['auteurdetails'];
    this.links = this.auteur.links;
    console.log('hasDeleteMethod: ', this.hasDeleteMethod);
    console.log('links: ', this.links);
    console.log('genreLinks: ', this.auteur.links);
    this.links.forEach(l => (l.method === 'DELETE' ?
     this.hasDeleteMethod = true : this.hasDeleteMethod = false)
      && console.log(l.method, this.hasDeleteMethod));
  }
  deleteAuteur() {
      this.auteursService.deleteItem(this.auteur).subscribe(r => this.router.navigate(['/auteurs']));
    }

   updateAuteur() {
    this.auteursService.updateItem(this.auteur, this.auteur.id).subscribe(r => this.router.navigate([`/auteurs`]));
  }
}
