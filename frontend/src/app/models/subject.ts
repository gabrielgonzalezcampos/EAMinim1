import {Student} from "./student";

export class Subject {
  _id: string;
  name: string;
  students:[Student]

  constructor(name: string, students: [Student]) {
    this.name = name;
    this.students = students;
  }

}
