import { Component, OnInit } from '@angular/core';
import { Author } from '../../../shared/models/author';
import { AuthorService } from '../../../shared/services/author.service';

@Component({
  selector: 'app-search-author',
  templateUrl: './search-author.component.html',
  styleUrls: ['./search-author.component.css']
})
export class SearchAuthorComponent implements OnInit {

  author: Author;

  constructor(
    private authorSvc: AuthorService, 
    ) { }

  ngOnInit() {
  }

  onSubmit(details) {
    this.authorSvc.getAuthor(details).subscribe((result) => {
     this.author = result;
   })
 }
}
