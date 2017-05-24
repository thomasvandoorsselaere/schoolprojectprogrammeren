import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { AlertModule } from 'ngx-bootstrap';

import { routes } from './routing';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { OverviewComponent } from './overview/overview.component';
import { CreateComponent } from './create/create.component';
import { DetailsComponent } from './details/details.component';
import {
   CollapsibleWellComponent
 } from './common/index';
import { BookService } from './shared/books.service';
import { BooksResolver } from './books-resolver.service';
import { UitgaveJaarPipe } from './shared/uitgave-jaar.pipe';
import { DetailsResolver } from 'app/details/books-details-resolver.service';
import { OverviewListComponent } from './overview/overview-list.component';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    OverviewComponent,
    CreateComponent,
    DetailsComponent,
    CollapsibleWellComponent,
    UitgaveJaarPipe,
    OverviewListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AlertModule.forRoot(),
    RouterModule.forRoot(routes)
  ],
  providers: [
    BookService,
    BooksResolver,
    DetailsResolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
