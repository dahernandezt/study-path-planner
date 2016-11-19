import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';

import { Subject } from '../model/subject';
import { Resource } from '../model/resource';
import { SubjectService } from '../services/subject.service';

@Component({
  moduleId: module.id,
  selector: 'subject-detail',
  templateUrl: '../template/subject-detail.component.html',
  styleUrls: [ '../css/subject-detail.component.css' ]
})

export class SubjectDetailComponent implements OnInit {
  subject: Subject;
  constructor(
    private subjectService: SubjectService,
    private route: ActivatedRoute,
    private location: Location
  ) {}
  
  ngOnInit(): void {
  this.route.params.forEach((params: Params) => {
    let id = +params['id'];
    this.subjectService.getSubject(id)
      .then(subject => this.subject = subject);
    });
  }
  
  goBack(): void {
    this.location.back();
  }
  
  add(name: string, url: string): void {
    name = name.trim();
	url = url.trim();
    if (!name || !url) { return; }
	let newResource: Resource =  new Resource(name, url);
	if (typeof this.subject.resources === 'undefined') {
		this.subject.resources = [];
	}
	this.subject.resources.push(newResource);
	this.subjectService.update(this.subject);
  }
  
  save(): void {
  this.subjectService.update(this.subject)
    .then(() => this.goBack());
  }
  
}