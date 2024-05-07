import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from "@angular/core";
import { Article } from "../../model/article";
import { ArticleQuantityChange } from "../../model/article-quantity-change";
import { ArticleService } from "../../services/article-service.service";
import { DefaultImageUrlPipe } from "./default-image-url.pipe";
import { NgClass, NgIf, CurrencyPipe } from "@angular/common";
import { RouterLink } from "@angular/router";

@Component({
    selector: "app-article-item",
    templateUrl: "./article-item.component.html",
    styleUrl: "./article-item.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        RouterLink,
        NgClass,
        NgIf,
        CurrencyPipe,
        DefaultImageUrlPipe,
    ],
})
export class ArticleItemComponent implements OnInit {
  @Input() article: Article;
  @Output() private quantityChange: EventEmitter<ArticleQuantityChange>;

  public priceClasses: any;

  constructor(
    private articleService: ArticleService,
    private cdr: ChangeDetectorRef
  ) {
    this.quantityChange = new EventEmitter<ArticleQuantityChange>();
  }

  ngOnInit() {
    this.priceClasses = {
      grey: !this.article.isOnSale,
      green: this.article.isOnSale,
    };
  }

  onQuantityChange(qty: number) {
    this.articleService
      .changeQuantity(this.article.id, qty)
      .subscribe((result) => {
        this.article.quantityInCart += qty;
        
        this.cdr.markForCheck();
      });
  }
}
