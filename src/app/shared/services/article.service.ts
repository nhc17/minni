import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Article } from '../models/article';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})

export class ArticleService {

  private articlesRootApiUrl = `${environment.api_url}/api/articles`;

  constructor(
      private http: HttpClient,
      public snackBar: MatSnackBar) { }

  // GET an array of articles
  public getArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(this.articlesRootApiUrl)
    .pipe(catchError(this.handleError<Article[]>('getArticles')));
  }

  
//Get a single article
public getArticle(idValue): Observable<Article> {
  return this.http.get<Article>(`${this.articlesRootApiUrl}/${idValue}`)
    .pipe(catchError(this.handleError<Article>('getArticle')));
}


publishArticle(article): Observable<Article> {
    return this.http.post<Article>(this.articlesRootApiUrl, article)
     .pipe(catchError(this.handleError<Article>('publishArticles')));
  }

 editArticle(details): Observable<Article> {
    console.log(details);
    return this.http.put<Article>(this.articlesRootApiUrl, details)
     .pipe(catchError(this.handleError<Article>('editArticle')));
  }

  
  private handleError<T>(operation = 'operation', result?: T){
    return (error: any): Observable<T> => {
      console.log(JSON.stringify(error.error));
      this.showErrorMessage(JSON.stringify(error.error));
      return throwError(error || 'generic backend error');
  }
}

  showErrorMessage(msg) {
    let snackBarRef = this.snackBar.open(msg, 'Undo');
    console.log(snackBarRef);
  }
}