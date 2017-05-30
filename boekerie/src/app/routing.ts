
import { Routes } from '@angular/router';

import { OverviewComponent } from 'app/overview/overview.component';
import { BookDetailsComponent } from 'app/bookdetails/bookdetails.component';
import { CreateComponent } from 'app/create/create.component';
import { BooksResolver } from './books-resolver.service';
import { BookDetailsResolver } from 'app/bookdetails/books-details-resolver.service';
import { GenresComponent, GenreEditComponent } from './genres/index';
import { AuteursComponent, AuteurDetailsComponent } from './auteurs/index';
import { GenresResolver } from './genres/genres-resolver.service';
import { AuteursResolver } from './auteurs/auteurs-resolver.service';
import { GenreDetailsResolver } from 'app/genres/genre-details-resolver.service';
import { AuteurDetailsResolver } from 'app/auteurs/auteur-details-resolver.service';

export const routes: Routes = [
  { path: '',  pathMatch: 'full', redirectTo: 'overview'},
  { path: 'overview', component: OverviewComponent, resolve: { books: BooksResolver}},
  { path: 'details/:isbn', component: BookDetailsComponent, resolve: { bookdetails: BookDetailsResolver}},
  { path: 'create', component: CreateComponent},
  { path: 'genres', component: GenresComponent, resolve: {genres: GenresResolver}},
  { path: 'genres/:id', component: GenreEditComponent, resolve: {genredetails: GenreDetailsResolver}},
  { path: 'auteurs', component: AuteursComponent, resolve: {auteurs: AuteursResolver}},
  { path: 'auteurs/:id', component: AuteurDetailsComponent, resolve: {auteurdetails: AuteurDetailsResolver}}
];
