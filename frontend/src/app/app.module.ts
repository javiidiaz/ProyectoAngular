import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BienvenidaComponent } from './components/bienvenida/bienvenida.component';
import { AcercadeComponent } from './components/acercade/acercade.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { ApiComponent } from './components/api/api.component';
import { FormatPricePipe } from './pipes/format-price.pipe';

@NgModule({
  declarations: [
    AppComponent,
    BienvenidaComponent,
    AcercadeComponent,
    NotfoundComponent,
    ApiComponent,
    FormatPricePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
