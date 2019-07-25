import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';

import {CoreModule} from './core/core.module';
import {SharedModule} from './shared/shared.module';
import {RequestInterceptor} from './core/interceptors/request-interceptor';
import {ErrorInterceptor} from './core/interceptors/error-Interceptor';
import {HTTP_INTERCEPTORS} from '@angular/common/http';

@NgModule({
  declarations: [AppComponent],
  imports: [CoreModule, SharedModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
