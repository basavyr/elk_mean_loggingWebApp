import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { UploaderComponent } from './uploader/uploader.component';
import { HttpClientModule } from "@angular/common/http";
import { Routes, RouterModule } from "@angular/router";
import { FetchLocalDataComponent } from './fetch-local-data/fetch-local-data.component';
import {
   MatIconModule,
   MatCardModule,
   MatButtonModule,
   MatProgressSpinnerModule
} from "@angular/material";
@NgModule({
   declarations: [
      AppComponent,
      ToolbarComponent,
      FetchDataComponent,
      UploaderComponent,
      FetchLocalDataComponent
   ],
   imports: [
      BrowserModule,
      BrowserAnimationsModule,
      MatToolbarModule,
      HttpClientModule
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
