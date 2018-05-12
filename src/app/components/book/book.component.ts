import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Book } from "../../interface/book";

@Component({
  selector: "book",
  templateUrl: "./book.component.html",
  styleUrls: ["./book.component.scss"]
})
export class BookComponent implements OnInit {
  @Input() book: Book;
  @Input() showEditButton: boolean;
  @Output() openEditModal = new EventEmitter
  constructor() {}

  ngOnInit() {}

  edit() {
   this.openEditModal.emit(this.book)
  }
}
