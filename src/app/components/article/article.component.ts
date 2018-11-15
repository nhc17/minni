import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { ArticleService } from '../../shared/services/article.service';
import { Article} from '../../shared/models/article';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatSnackBar } from '@angular/material';
import {MatSort, MatTableDataSource, MatPaginator} from '@angular/material';

/*
export interface DialogData {
  id: string;
  firstname: string;
  lastname: string;
}
*/
@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})

export class ArticleComponent implements OnInit {

  articles: Article[];
  dataSource = (new MatTableDataSource([]));

  constructor(private articleSvc: ArticleService
    /*
    private router: Router,
    public dialog: MatDialog,
    private snackSvc: MatSnackBar */
    ) { }

  ngOnInit() {
    this.articleSvc.getArticles().subscribe((result)=>{
        this.articles = result;
        this.dataSource = new MatTableDataSource(result);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
     
  
    });
  }

displayedColumns: string[] = ['id', 'category_name', 'title', 'author_firstname', 'post_date'];
//dataSource = new MatTableDataSource(this.articles);


// sort
 @ViewChild(MatSort) sort: MatSort;

 // paginator
 length = 100;
 pageSize = 5;
 pageSizeOption: number[] = [5, 10, 20, 50];
 @ViewChild(MatPaginator) paginator: MatPaginator;













    /*
  onEdit(idValue){
    console.log(idValue);
    this.router.navigate([`/Article/Edit/${idValue}`]);
  }

  onAdd(){
    this.router.navigate(['/Article/Add']);
  }


  onDelete(idValue, firstname, lastname) {
    const dialogRef = this.dialog.open(DeleteArticleDialog, {
      width: '250px',
      data: {id: idValue, firstname: firstname, lastname: lastname}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      if(typeof(result) !== 'undefined')
      {
        this.articleSvc.deleteArticle(idValue).subscribe((result)=>{
          console.log(result);
          for(let x = 0; x < this.articles.length; x++) {
            if(this.articles[x].id === idValue) {
              this.articles.splice(x, 1);
              break;
            }
          }
          let snackBarRef = this.snackSvc.open("Article Deleted", 'Done', {
            duration: 3000
          });
        })
      }       
    });
  }

}

@Component({
  selector: 'delete-Article-dialog',
  templateUrl: 'Article-delete-dialog.html',
})
export class DeleteArticleDialog {

  constructor(
    public dialogRef: MatDialogRef<DeleteArticleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
*/

}