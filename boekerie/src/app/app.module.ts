import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { AlertModule } from 'ngx-bootstrap';
import { StarRatingModule } from 'angular-star-rating';
import { PopupModule } from 'ng2-opd-popup';

// Routing
import { routes } from './routing';

 // Components
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { OverviewComponent } from './overview/overview.component';
import { OverviewListComponent } from './overview/overview-list.component';
import { CreateComponent } from './create/create.component';
import { BookDetailsComponent } from './bookdetails/bookdetails.component';
import { GenresComponent, GenreEditComponent } from './genres/index';
import { AuteursComponent, AuteurDetailsComponent } from './auteurs/index';
import {
   CollapsibleWellComponent
 } from './common/index';
import { ErrorPageComponent } from './error/error-page.component';
import { EditbookComponent } from './bookdetails/editbook/editbook.component';

// Services
import { BookService } from './shared/books.service';
import { BooksResolver } from './books-resolver.service';
import { BookDetailsResolver } from 'app/bookdetails/books-details-resolver.service';
import { AuteursService } from './shared/auteurs.service';
import { AuteursResolver } from './auteurs/auteurs-resolver.service';
import { GenresService } from './shared/genres.service';
import { GenresResolver } from './genres/genres-resolver.service';
import { GenreDetailsResolver } from 'app/genres/genre-details-resolver.service';
import { AuteurDetailsResolver } from 'app/auteurs/auteur-details-resolver.service';
import { BaseService } from 'app/shared/base.service';

// Pipes
import { UitgaveJaarPipe } from './shared/uitgave-jaar.pipe';



@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    OverviewComponent,
    CreateComponent,
    BookDetailsComponent,
    CollapsibleWellComponent,
    UitgaveJaarPipe,
    OverviewListComponent,
    GenresComponent,
    AuteursComponent,
    GenreEditComponent,
    AuteurDetailsComponent,
    ErrorPageComponent,
    EditbookComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    StarRatingModule,
    HttpModule,
    AlertModule.forRoot(),
    RouterModule.forRoot(routes),
    PopupModule.forRoot()
  ],
  providers: [
    BookService,
    BooksResolver,
    BookDetailsResolver,
    GenresService,
    GenresResolver,
    GenreDetailsResolver,
    AuteursService,
    AuteursResolver,
    AuteurDetailsResolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
