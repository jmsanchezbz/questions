import { inject } from "@angular/core";
import { Article } from "../model/article";
import { ArticleService } from "./article-service.service";
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  ResolveFn,
} from "@angular/router";
import { Observable } from "rxjs";

export const articleLoadResolveFn: ResolveFn<Article> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Article | Observable<Article> | Promise<Article> => {
  const articleService = inject(ArticleService);

  const articleId = parseInt(route.paramMap.get('id'),10);
  return articleService.getArticle(articleId);
};
