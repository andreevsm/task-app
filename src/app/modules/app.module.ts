import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { Task, TaskFactory } from '../models/task.model';
import { AppComponent } from './app.component';

import {
  MdButtonModule,
  MdMenuModule,
  MdToolbarModule,
  MdIconModule,
  MdCardModule,
  MdInputModule,
  MdCheckboxModule
} from '@angular/material';
import 'hammerjs';
import { TaskComponent } from './task/task.component';


@NgModule({
  declarations: [
    AppComponent,
    TaskComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    MdButtonModule,
    MdMenuModule,
    MdToolbarModule,
    MdIconModule,
    MdCardModule,
    FormsModule,
    HttpModule,
    MdInputModule,
    MdCheckboxModule
  ],
  providers: [
    TaskFactory
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
