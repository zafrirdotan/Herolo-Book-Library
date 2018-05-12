import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule }    from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { BooksListComponent } from './pages/books-list/books-list.component';
import { BookComponent } from './components/book/book.component';
import { BooksService } from './services/books.service';
import { ModalModule } from 'ngx-bootstrap/modal';
import { EditBookFormComponent } from './components/edit-book-form/edit-book-form.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {
  MatFormFieldModule,
  MatInputModule,
  MatDatepickerModule,
  MatButtonModule
} from '@angular/material';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { TitleFilterPipe } from './pipes/title-filter.pipe';
import { CheckExistingTitleService } from './services/check-existing-title.service';
import { NavComponent } from './components/nav/nav.component';

var NgxBootstrap =[
  ModalModule.forRoot()
] 


var Material = [
  MatDatepickerModule,
  MatFormFieldModule,
  MatInputModule,
  MatNativeDateModule
]

@NgModule({
  declarations: [
    AppComponent,
    BooksListComponent,
    BookComponent,
    EditBookFormComponent,
    TitleFilterPipe,
    NavComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ...NgxBootstrap,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    ...Material
    
  ],
  providers: [BooksService, CheckExistingTitleService],
  bootstrap: [AppComponent]
})
export class AppModule { }
