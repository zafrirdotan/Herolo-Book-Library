import { Injectable } from "@angular/core";
import { Book } from "../interface/book";
import { BooksService } from "./books.service";

@Injectable()
export class CheckExistingTitleService {
  isExisting: boolean;
  constructor(public booksService: BooksService) {}

  checkExistingTitle(bookTitle){
    bookTitle = this.formatBookTitle(bookTitle);
    this.isExisting = !!this.booksService.books.find(book => {
      return this.formatBookTitle(book.Title) === bookTitle;
    });
    return this.isExisting;
  }

  formatBookTitle(bookTitle) {
    let formatedTitle = bookTitle
      .replace(/[^\w\s]/gi, "")
      .trim()
      .toLocaleLowerCase();
      return formatedTitle;
  }
}
