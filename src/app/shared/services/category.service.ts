import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Category } from '../models/category';
import { Subject }    from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private categoryRootApiUrl = `${environment.api_url}/api/category`; 
  private editCategoryNameSource = new Subject<string>();
  editCategoryName$ = this.editCategoryNameSource.asObservable();
  
  constructor(
      private http: HttpClient,
      public snackBar: MatSnackBar) { }

  public getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.categoryRootApiUrl)
     .pipe(catchError(this.handleError<Category[]>('getCategories')));
  }

  editNameBroadcast(name: string) {
    this.editCategoryNameSource.next(name);
  }

  getEditCategoryName$() : Observable<any>
  {
    return this.editCategoryName$;
  }
  
  editCategory(details): Observable<Category> {
    console.log(details);
    return this.http.put<Category>(this.categoryRootApiUrl, details)
     .pipe(catchError(this.handleError<Category>('editCategories')));
  }

  addCategory(category): Observable<Category> {
    return this.http.post<Category>(this.categoryRootApiUrl, category)
    .pipe(catchError(this.handleError<Category>('addCategory')));
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

