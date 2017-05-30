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
  constructor(private auteursService: AuteursService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.auteur = this.route.snapshot.data['auteurdetails'];
    console.log(this.auteur);
  }

}
