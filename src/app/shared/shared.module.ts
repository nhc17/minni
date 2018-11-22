import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangePasswordComponent } from './security/change-password/change-password.component';
import { ForgotPasswordComponent } from './security/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './security/reset-password/reset-password.component';

//import { ErrorComponent } from './security/error/error.component';



@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ChangePasswordComponent, ForgotPasswordComponent, ResetPasswordComponent]
})
export class SharedModule { }
