import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Article } from './article';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const articles = [
      { id: 11, name: 'Article1', description: 'aaaaaaaaaaaaaaaaa'},
      { id: 12, name: 'Article2', description: 'aaaaaaaaaaaaaaaaa'},
      { id: 13, name: 'Article3', description: 'aaaaaaaaaaaaaaaaa'},
      { id: 14, name: 'Article4', description: 'aaaaaaaaaaaaaaaaa'},
      { id: 15, name: 'Article5', description: 'aaaaaaaaaaaaaaaaa'},
      { id: 16, name: 'Article6', description: 'aaaaaaaaaaaaaaaaa'},
      { id: 17, name: 'Article7', description: 'aaaaaaaaaaaaaaaaa'},
      { id: 18, name: 'Article8', description: 'aaaaaaaaaaaaaaaaa'},
      { id: 19, name: 'Article9', description: 'aaaaaaaaaaaaaaaaa'},
      { id: 20, name: 'Article10', description: 'aaaaaaaaaaaaaaaaa'}
    ];
    return {articles};
  }
  genId(articles: Article[]): number {
    return articles.length > 0 ? Math.max(...articles.map(article => article.id)) + 1 : 11;
  }
}
