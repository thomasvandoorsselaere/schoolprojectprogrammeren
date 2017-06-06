import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { IBook, IGenre, IAuteur } from "app/shared/index";
import { BookService } from "app/shared/books.service";

@Component({
  selector: 'app-editbook',
  templateUrl: './editbook.component.html',
  styleUrls: ['./editbook.component.css']
})
export class EditbookComponent implements OnInit {

  book: IBook;
  selectedTags: string[]= [];
  availableTags: string[]= [];
  newTagModel = null;

  constructor(private route: ActivatedRoute, private bookService: BookService, private router: Router) { }

  ngOnInit() {
     this.book = this.route.snapshot.data['bookdetails'];
     // onderstaande manier is mogelijks niet oké bij laadtijden?
     this.selectedTags = this.book.tags;
     console.log(this.selectedTags);
     this.availableTags = this.bookService.getTagList();
  }

  // verdere controles te voorzien zodat bestaande tags niet ontdubbeld worden
  removeTagFromSelected(tag) {
    const index = this.selectedTags.indexOf(tag);
    this.selectedTags.splice(index, 1);

    this.availableTags.push(tag);
    this.availableTags.sort();
  }

  addTagToSelected(tag: string) {
    const index = this.availableTags.indexOf(tag);

    this.availableTags.splice(index, 1);

    this.selectedTags.push(tag);
    this.selectedTags.sort();
  }

  addNewTag(tag: string) {
    if (this.availableTags.indexOf(tag.toUpperCase()) !== -1) {
      this.addTagToSelected(tag.toUpperCase());
    } else {
      this.selectedTags.push(tag.toUpperCase());
      this.selectedTags.sort();
    }
    this.newTagModel = null;

  }
  updateBoek() {
    this.book.tags = this.selectedTags;
    this.bookService.updateItem(this.book, this.book.isbn).subscribe(r => this.router.navigate([`/details/${this.book.isbn}`]));
  }
}
