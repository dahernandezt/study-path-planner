import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent }   from './components/dashboard.component';
import { SubjectsComponent }      from './components/subject-list.component';
import { SubjectDetailComponent }  from './components/subject-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/subjects', pathMatch: 'full' },
  { path: 'subject_detail/:id', component: SubjectDetailComponent },
  { path: 'subjects',     component: SubjectsComponent }
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}