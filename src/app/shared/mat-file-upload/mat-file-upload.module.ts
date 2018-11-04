import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { FileUploadInputFor } from './file-upload-input-for.directive';
import { BytesPipe } from './bytes.pipe';
import { MatFileUpload } from './mat-file-upload/mat-file-upload.component';
import { MatFileUploadQueue MatFileUploadComponent} from './mat-file-upload/mat-file-upload.component';

import { MatProgressBarModule, MatCardModule, MatButtonModule } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  imports: [
    MatButtonModule,
    MatProgressBarModule,
    MatIconModule,
    MatCardModule,
    HttpClientModule,
    CommonModule
  ],
  declarations: [
    MatFileUpload,
    MatFileUploadQueue,
    FileUploadInputFor,
    BytesPipe
  ],
  exports: [
    MatFileUpload,
    MatFileUploadQueue,
    FileUploadInputFor,
    BytesPipe
  ]
})
export class MatFileUploadModule { }
