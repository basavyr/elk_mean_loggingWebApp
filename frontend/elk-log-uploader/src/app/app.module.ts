import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { UploaderComponent } from './uploader/uploader.component';

@NgModule({
   declarations: [
      AppComponent,
      ToolbarComponent,
      FetchDataComponent,
      UploaderComponent
   ],
   imports: [
      BrowserModule,
      BrowserAnimationsModule,
      MatToolbarModule
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
