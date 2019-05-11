import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Article } from '../article';
import { ArticleService } from '../article.service';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: [ './article-detail.component.css' ]
})
export class ArticleDetailComponent implements OnInit {
  @Input() article: Article;

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getArticle();
  }

  getArticle(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.articleService.getArticlesById(id)
      .subscribe(article => this.article = article);
  }

  goBack(): void {
    this.location.back();
  }

 save(): void {
    this.articleService.updateArticle(this.article)
      .subscribe(() => this.goBack());
  }
}
