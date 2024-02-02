import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { MenuComponent } from "./templates/menu/menu.component";
import { PreloadAllModules, RouterModule, RouterOutlet } from "@angular/router";
import { RouterLoggingService } from "./services/router-logging.service";
import { ApiInterceptor } from "./services/api.interceptor";

@NgModule({
  declarations: [AppComponent, MenuComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterOutlet,
    RouterModule.forRoot([], { preloadingStrategy: PreloadAllModules }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true,
    }
    , RouterLoggingService],
  bootstrap: [AppComponent],
})
export class AppModule {}
