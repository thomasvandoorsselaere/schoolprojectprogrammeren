import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OverviewComponent } from 'app/overview/overview.component';
import { DetailsComponent } from 'app/details/details.component';
import { CreateComponent } from 'app/create/create.component';

const routes: Routes = [
  { path: '',  pathMatch: 'full', redirectTo: 'overview'},
  { path: 'overview', component: OverviewComponent},
  { path: 'details', component: DetailsComponent},
  { path: 'create', component: CreateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
