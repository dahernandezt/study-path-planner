import { Component, OnInit } from '@angular/core';
import { Subject } from '../model/subject';
import { SubjectService } from '../services/subject.service';
import { Router } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'my-subjects',
  templateUrl: '../template/subject-list.component.html',
  styleUrls: ['../css/subject-list.component.css'],
  providers: [SubjectService]
})
export class SubjectsComponent implements OnInit {
  subjects: Subject[];
  selectedSubject: Subject;
  constructor(private subjectService: SubjectService, private router: Router) { }
  getSubjects(): void {
    this.subjectService.getSubjects().then(subjects => this.subjects = subjects);
  }
  ngOnInit(): void {
    this.getSubjects();
  }

  onSelect(subject: Subject): void {
    this.selectedSubject = subject;
  }
  gotoDetail(subject: Subject): void {
    this.selectedSubject = subject;
    this.router.navigate(['/subject_detail', this.selectedSubject.id]);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.subjectService.create(name)
      .then(subject => {
        this.subjects.push(subject);
        this.selectedSubject = null;
      });
  }

  printAll() {
    let subjectsList = [];
    for (var i = 0; i < this.subjects.length; i++) {
      let resourcesList = [];
      for (var j = 0; j < this.subjects[i].resources.length; j++) {
        resourcesList.push(this.subjects[i].resources[j].name + ", " + this.subjects[i].resources[j].url);
      }
      subjectsList.push([this.subjects[i].name , {ul:resourcesList}]);
    }
    console.log(subjectsList);
    let pdfContent = ['Subjects:',{ul:subjectsList}];
    let docDefinition = { content: pdfContent };
    pdfMake.createPdf(docDefinition).download('YourStudyPlan.pdf');
  }

  delete(subject: Subject): void {
    this.subjectService
      .delete(subject.id)
      .then(() => {
        this.subjects = this.subjects.filter(s => s !== subject);
        if (this.selectedSubject === subject) { this.selectedSubject = subject; }
      });
  }
}