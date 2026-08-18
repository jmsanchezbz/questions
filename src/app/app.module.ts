import { APP_ID, NgModule, provideZoneChangeDetection } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi, withXhr } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { MenuComponent } from "./templates/menu/menu.component";
import { PreloadAllModules, RouterModule, RouterOutlet } from "@angular/router";
import { RouterLoggingService } from "./services/router-logging.service";
import { ApiInterceptor } from "./services/api.interceptor";
import { AuthInterceptorService } from "./shared/services/auth-interceptor.service";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";

@NgModule({ declarations: [AppComponent],
    bootstrap: [AppComponent], imports: [BrowserModule,
        AppRoutingModule,
        RouterOutlet,
        RouterModule.forRoot([], { preloadingStrategy: PreloadAllModules }),
        MenuComponent], providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ApiInterceptor,
            multi: true,
        },
        RouterLoggingService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptorService,
            multi: true,
        },
        {
            provide: APP_ID,
            useValue: "questions",
        },
        provideZoneChangeDetection(),
        provideAnimationsAsync(),
        provideHttpClient(withXhr(), withInterceptorsFromDi()),
    ] })
export class AppModule {}
