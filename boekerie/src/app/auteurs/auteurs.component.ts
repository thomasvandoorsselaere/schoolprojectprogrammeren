import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { IAuteur } from '../shared/auteur.model';
import { AuteursService } from 'app/shared/auteurs.service';

@Component({
  selector: 'app-auteurs',
  templateUrl: './auteurs.component.html',
  styleUrls: ['./auteurs.component.css']
})
export class AuteursComponent implements OnInit {

  auteurs: IAuteur[] = [];

  constructor(private auteursService: AuteursService, private router: Router ) { }

  ngOnInit() {
    this.auteursService.getAuteurs().subscribe((data) => {this.auteurs = data.value; });
    }

}
