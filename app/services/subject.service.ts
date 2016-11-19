import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Subject } from '../model/subject';

@Injectable()
export class SubjectService {
  private subjectsUrl = 'app/subjects';  // URL to web api

  constructor(private http: Http) { }

  getSubjects(): Promise<Subject[]> {
    return this.http.get(this.subjectsUrl)
      .toPromise()
      .then(response => response.json().data as Subject[])
      .catch(this.handleError);
  }

  getSubject(id: number): Promise<Subject> {
    return this.getSubjects()
      .then(subjects => subjects.find(subject => subject.id === id));
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  private headers = new Headers({ 'Content-Type': 'application/json' });

  update(subject: Subject): Promise<Subject> {
    const url = `${this.subjectsUrl}/${subject.id}`;
    return this.http
      .put(url, JSON.stringify(subject), { headers: this.headers })
      .toPromise()
      .then(() => subject)
      .catch(this.handleError);
  }

  create(name: string): Promise<Subject> {
    return this.http
      .post(this.subjectsUrl, JSON.stringify({ name: name }), { headers: this.headers })
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

  delete(id: number): Promise<void> {
    const url = `${this.subjectsUrl}/${id}`;
    return this.http.delete(url, { headers: this.headers })
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

}