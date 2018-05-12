import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import "rxjs/add/operator/map";
import { Book } from "../interface/book";
import { CheckExistingTitleService } from "./check-existing-title.service";

@Injectable()
export class BooksService {
  private heroesUrl = "./assets/books.json";
  public books: Book[];
  constructor(private http: HttpClient) {}

  public getBooks(): Observable<any> {
    return this.http.get("./assets/books.json");
  }

  update(newBook) {
    this.books = this.books.map(book => {
      if (book._id === newBook._id) {
        book = newBook;
      }
      return book;
    });
    return this.books;
  }

  creat(newBook): Book[] {
    newBook._id = "b" + Date.now();
    this.books = [...this.books, newBook];
    return this.books;
  }

  delete(id) {
    return this.books = this.books.filter(book => book._id !== id);
  }
}
