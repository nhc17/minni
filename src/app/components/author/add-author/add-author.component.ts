import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { MatSnackBar } from '@angular/material';
import { Author } from '../../../shared/models/author';
import { AuthorService } from '../../../shared/services/author.service';

@Component({
  selector: 'app-add-author',
  templateUrl: './add-author.component.html',
  styleUrls: ['./add-author.component.css']
})
export class AddAuthorComponent implements OnInit {

  addAuthorForm: FormGroup
 
  constructor(
    private fb: FormBuilder,
    private authorSvc: AuthorService, 
    private snackSvc: MatSnackBar) {
      this.addAuthorForm = fb.group({
        firstname: ['', [Validators.required]],
        lastname: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        profile: ['', [Validators.required]]
      })
    }

  ngOnInit() {
  }

  onSubmit(){
    console.log(this.addAuthorForm.get("firstname").value);
    console.log(this.addAuthorForm.get("lastname").value);
    console.log(this.addAuthorForm.get("profile").value);
    var authorObj: Author = {
      firstname: this.addAuthorForm.get("firstname").value,
      lastname: this.addAuthorForm.get("lastname").value,
      email: this.addAuthorForm.get('email').value,
      profile: this.addAuthorForm.get("profile").value 
    }
    this.authorSvc.addAuthor(authorObj).subscribe((result)=>{
      let snackBarRef = this.snackSvc.open("Author added", 'Done', {
        duration: 3000
      });
    })
  }

}
