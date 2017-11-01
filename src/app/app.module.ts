import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ConnectivityComponentComponent } from './connectivity-component/connectivity-component.component';

@NgModule({
  declarations: [
    AppComponent,
    ConnectivityComponentComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
