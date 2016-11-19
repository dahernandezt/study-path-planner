import { InMemoryDbService } from 'angular-in-memory-web-api';
export class InMemoryDataSubjectsService implements InMemoryDbService {
  createDb() {
    let subjects = [
      {id: 1, name: 'Biology', resources:[{id: 1, name: 'Google', url: 'www.google.com'}, {id: 2, name: 'Khan Academy', url: 'www.khanacademy.org/science/biology'}]},
	  {id: 2, name: 'Mathematics', resources:[{id: 1, name: 'Google', url: 'www.google.com'}]},
	  {id: 3, name: 'Physics', resources:[{id: 1, name: 'Google', url: 'www.google.com'}]},
    ];
    return {subjects};
  }
}