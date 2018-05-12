import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { BooksService } from "../../services/books.service";
import { Book } from "../../interface/book";

@Component({
  selector: "app-books-list",
  templateUrl: "./books-list.component.html",
  styleUrls: ["./books-list.component.scss"]
})
export class BooksListComponent implements OnInit {
  constructor(private booksService: BooksService) {}

  public books: Book[];
  public selectedBook: Book;
  public isNewBookMode: boolean;

  ngOnInit() {
    this.getBooks();
  }

  getBooks() {
    this.booksService.getBooks().subscribe(res => {
      this.books = res;
      this.booksService.books = this.books;
    });
  }

  selectBook(book: Book) {
    this.selectedBook = book;
  }

  saveBook(newBook) {
    if (newBook._id) {
      this.books = this.booksService.update(newBook);
    } else {
      this.books = this.booksService.creat(newBook);
    }
    this.unSelectBook();
  }

  deleteBook() {
    this.books = this.booksService.delete(this.selectedBook._id);
    this.unSelectBook();
  }

  unSelectBook() {
    this.selectedBook = null;
    this.isNewBookMode = false;
  }
}
