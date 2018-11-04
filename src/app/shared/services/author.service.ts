import { Injectable } from '@angular/core';
import { Author } from '../models/author';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})

export class AuthorService {

  private authorRootApiUrl = `${environment.api_url}/api/authors`;

  constructor(
    private http: HttpClient,
    public snackBar: MatSnackBar) { }

  // Get an array of authors
  public getAuthors(): Observable<Author[]> {
    return this.http.get<Author[]>(this.authorRootApiUrl)
      .pipe(catchError(this.handleError<Author[]>('getAuthors')));
  }

  //Get a single author
  public getAuthor(idValue): Observable<Author> {
    return this.http.get<Author>(`${this.authorRootApiUrl}/${idValue}`)
      .pipe(catchError(this.handleError<Author>('getAuthor')));
  }

  editAuthor(details): Observable<Author> {
    console.log(details);
    return this.http.put<Author>(this.authorRootApiUrl, details)
    .pipe(catchError(this.handleError<Author>('editAuthor')));
  }

  addAuthor(author): Observable<Author> {
    return this.http.post<Author>(this.authorRootApiUrl, author)
    .pipe(catchError(this.handleError<Author>('addAuthor')));
  }

  deleteAuthor(idValue): Observable<Author> {
    console.log(idValue);
    return this.http.delete<Author>(`${this.authorRootApiUrl}?id=${idValue}`)
    .pipe(catchError(this.handleError<Author>('editAuthor')));
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