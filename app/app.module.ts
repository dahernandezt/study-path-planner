import './rxjs-extensions';
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { AppRoutingModule } from './app-routing.module';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './services/in-memory-data.service';
import { InMemoryDataSubjectsService }  from './services/in-memory-data-subjects.service';

import { AppComponent }         from './components/app.component';
import { SubjectsComponent  }          from './components/subject-list.component';
import { SubjectService }          from './services/subject.service';
import { SubjectDetailComponent }  from './components/subject-detail.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService),
    InMemoryWebApiModule.forRoot(InMemoryDataSubjectsService),
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    SubjectsComponent,
	SubjectDetailComponent,
  ],
  providers: [ SubjectService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }