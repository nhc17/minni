import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';  //open source authentication wrapper
import { auth } from 'firebase/app'; // the object that does the authentication
// import { MatSnackBar } from '@angular/material';
//import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  
  PASSWORD_PATTERN = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{12,}$/;
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, 
   // private snackSvc:  MatSnackBar,
   // private router: Router,
    public afAuth: AngularFireAuth,
    private authService: AuthService ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(this.PASSWORD_PATTERN)]],
    })
   }


  signUp(){
    const formValue = this.registerForm.value;
    this.authService.signUp(formValue.email, formValue.password)
          .subscribe(
              (result) => {
                console.log(result);
                
                this.authService.setFirebaseTokenToLocalstorage();
                
                setTimeout(function() {
                    //this.spinnerService.hide();
                    //this.router.navigate(['']);
                    console.log("delay ...");
                  }.bind(this), 4500);
                
              }
          )
  }

 
  ngOnInit() {
  }

 
}
