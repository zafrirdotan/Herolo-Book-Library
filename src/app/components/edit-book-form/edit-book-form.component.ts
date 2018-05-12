import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Book } from "../../interface/book";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  ValidatorFn,
  AbstractControl
} from "@angular/forms";

import { CheckExistingTitleService } from "../../services/check-existing-title.service";

@Component({
  selector: "edit-book-form",
  templateUrl: "./edit-book-form.component.html",
  styleUrls: ["./edit-book-form.component.scss"]
})

export class EditBookFormComponent implements OnInit {
  @Input() book: Book;
  @Output() saveBook = new EventEmitter();

  emptyBook: Book = {
    Title: "",
    Author: "",
    Date: Date.now(),
    Poster: ""
  };

  editBookForm: FormGroup;

  constructor(private fb: FormBuilder, private checkExistingTitleService: CheckExistingTitleService) {
     // First initalizing the form with an empty book object    
    this.createForm(this.emptyBook);
  }

  ngOnInit() {
    // Initalizing form with existing card details if injected from Input 
    if (this.book) {
      this.createForm(this.book);
    }
  }

  // Initalizing form  
  createForm(book) {
    this.editBookForm = new FormGroup({
      title: new FormControl(book.Title.replace(/[^\w\s]/gi, ''), [
        // Validations: required, minLength 2, maxLength 30, 
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(30),
        // Don't accept characters like: @#$%^&*,
        this.forbiddenNameValidator(/[@#$%^&*]/i), 
        // Dont accept two similar book titles in the bookList 
        this.titleValidator()
      ]),
      author: new FormControl(book.Author, [
        // Validations: required, minLength 2, maxLength 30, 
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(30)
      ]),
      date: new FormControl(new Date(+book.Date), [Validators.required])
    });
  }

  onSubmit() {
    let newBook = this.prepareBookForSaving();
    this.saveBook.emit(newBook);
  }

  prepareBookForSaving(): Book {
    const formModel = this.editBookForm.value;
    const newBook: Book = {
      _id: this.book ? this.book._id : null,
      Title: formModel.title,
      Author: formModel.author,
      Date: new Date(formModel.date).getTime(),
      Poster: this.book ? this.book.Poster : null
    };
    return newBook;
  }
  // Getting the formControl elements for showing validations  

  get title() {
    return this.editBookForm.get("title");
  }

  get author() {
    return this.editBookForm.get("author");
  }

  get date() {
    return this.editBookForm.get("date");
  }


// Don't accept characters that mach a certain regular expression pattern 
  forbiddenNameValidator(nameRe: RegExp): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
      const forbidden = nameRe.test(control.value);
      return forbidden ? {'forbiddenName': {value: control.value}} : null;
    };
  }

// Validate if A certain Title is not used by another book in the list 
  titleValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
      const isExisting = this.checkExistingTitleService.checkExistingTitle(control.value)
      return isExisting ? {'titleExists': {value: control.value}} : null;
    };
  }

  
}
