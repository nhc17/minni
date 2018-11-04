import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//Modules & Components
import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';
import { AuthorComponent } from './components/author/author.component';
import { AddAuthorComponent } from './components/author/add-author/add-author.component';
import { DeleteAuthorDialog } from './components/author/author.component';
import { ArticleComponent } from './components/article/article.component';
import { PublishComponent } from './components/article/publish/publish.component';
import { CategoryComponent } from './components/category/category.component';
import { MemberComponent } from './components/member/member.component';

// Reactive Forms
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Design Materials
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './shared/layout/header/header.component';
import { MaterialModule } from './shared/layout/material.module';

// Services
import { HttpClientModule } from '@angular/common/http';
import { RoutingModule } from './app.routing';
import { EditAuthorComponent } from './components/author/edit-author/edit-author.component';





@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AuthorComponent,
    AddAuthorComponent,
    DeleteAuthorDialog,
    ArticleComponent,
    CategoryComponent,
    MemberComponent,
    PublishComponent,
    EditAuthorComponent
    
  ],

  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    MaterialModule,
    HttpClientModule,
    RoutingModule,
    
  ],

  providers: [],
  entryComponents: [DeleteAuthorDialog],
  bootstrap: [AppComponent]
})

export class AppModule { }
