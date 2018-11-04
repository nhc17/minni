import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { MatSnackBar } from '@angular/material';
import { Author } from '../../../shared/models/author';
import { AuthorService } from '../../../shared/services/author.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-author',
  templateUrl: './edit-author.component.html',
  styleUrls: ['./edit-author.component.css']
})

export class EditAuthorComponent implements OnInit {

  author: Author;
  editAuthorForm: FormGroup
 
  constructor(
    private fb: FormBuilder,
    private authorSvc: AuthorService, 
    private snackSvc: MatSnackBar,
    private activatedRoute: ActivatedRoute) {
      this.editAuthorForm = fb.group({
        firstname: ['', [Validators.required]],
        lastname: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        profile: ['', [Validators.required]]
      })
    }

  ngOnInit() {
    let id = this.activatedRoute.snapshot.params.id;
    console.log(id);
    this.authorSvc.getAuthor(id).subscribe((result)=>{
      console.log(JSON.stringify(result))
      this.editAuthorForm.patchValue({
        id: result.id,
        firstname: result.firstname,
        lastname: result.lastname,
        email: result.email,
        profile: result.profile
      });
      this.author = result;
    })
  }
 

  onSubmit(){
    console.log(this.editAuthorForm.get("firstname").value);
    console.log(this.editAuthorForm.get("lastname").value);
    console.log(this.editAuthorForm.get("profile").value);
    var authorObj: Author = {
      firstname: this.editAuthorForm.get("firstname").value,
      lastname: this.editAuthorForm.get("lastname").value,
      email: this.editAuthorForm.get('email').value,
      profile: this.editAuthorForm.get("profile").value 
    }
    this.authorSvc.addAuthor(authorObj).subscribe((result)=>{
      let snackBarRef = this.snackSvc.open("Author updated", 'Done', {
        duration: 3000
      });
    })
  }

}
