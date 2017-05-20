
import { Routes } from '@angular/router';

import { OverviewComponent } from 'app/overview/overview.component';
import { DetailsComponent } from 'app/details/details.component';
import { CreateComponent } from 'app/create/create.component';
import { BooksResolver } from './books-resolver.service';

export const routes: Routes = [
  { path: '',  pathMatch: 'full', redirectTo: 'overview'},
  { path: 'overview', component: OverviewComponent, resolve: { books: BooksResolver}},
  { path: 'details', component: DetailsComponent},
  { path: 'create', component: CreateComponent}
];