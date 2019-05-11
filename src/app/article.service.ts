import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Article } from './article';
import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class ArticleService {

  private url = 'api/articles';
  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  getArticles (): Observable<Article[]> {
    return this.http.get<Article[]>(this.url)
      .pipe(
        tap(_ => this.log('fetched articles')),
        catchError(this.handleError<Article[]>('getArticles', []))
      );
  }

  getArticleNo404<Data>(id: number): Observable<Article> {
    const url = `${this.url}/?id=${id}`;
    return this.http.get<Article[]>(url)
      .pipe(
        map(articles => articles[0]),
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} article id=${id}`);
        }),
        catchError(this.handleError<Article>(`getArticle id=${id}`))
      );
  }

  getArticlesById(id: number): Observable<Article> {
    const url = `${this.url}/${id}`;
    return this.http.get<Article>(url).pipe(
      tap(_ => this.log(`fetched article id=${id}`)),
      catchError(this.handleError<Article>(`getArticle id=${id}`))
    );
  }

  searchArticles(term: string): Observable<Article[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Article[]>(`${this.url}/?name=${term}`).pipe(
      tap(_ => this.log(`found articles matching "${term}"`)),
      catchError(this.handleError<Article[]>('searchArticles', []))
    );
  }

  addArticle (article: Article): Observable<Article> {
    console.log(article.name)
    console.log(article.id)
    console.log(article.description)
    return this.http.post<Article>(this.url, article, httpOptions).pipe(

      tap((newArticle: Article) => this.log(`added Article w/ id=${newArticle.id}`)),
      
      catchError(this.handleError<Article>('addArticle'))
    );
  }

  deleteArticle (article: Article | number): Observable<Article> {
    const id = typeof article === 'number' ? article : article.id;
    const url = `${this.url}/${id}`;

    return this.http.delete<Article>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted article id=${id}`)),
      catchError(this.handleError<Article>('deleteArticle'))
    );
  }

  updateArticle (article: Article): Observable<any> {
    return this.http.put(this.url, article, httpOptions).pipe(
      tap(_ => this.log(`updated article id=${article.id}`)),
      catchError(this.handleError<any>('updateArticle'))
    );
  }
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      
      console.error(error); 
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add(`ArticleService: ${message}`);
  }
}
